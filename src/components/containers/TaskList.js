import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Task from '../presentational/Task';
import { FullButton } from '../presentational/styled/Button';
import { TaskSection, DateTimePicker } from '../presentational/Dropdown';
import { Row } from '../presentational/styled/Layout';
import Icon from '../presentational/styled/Icon';

import TaskService from '../../services/TaskService';

const newDateNextDay = () => {
	const initDate = new Date();
	initDate.setTime(initDate.getTime() + 24 * 60 * 60 * 1000);
	initDate.setMinutes(0);
	initDate.setSeconds(0, 0);
	return initDate.toISOString();
};

const emptyTask = {
	id: 0,
	name: '',
	duration: 30,
	description: '',
	created_time: '',
	scheduled_time: '',
	completed: false,
	scheduled: false,
	due_date: newDateNextDay()
};

const TaskList = () => {
	/* Sample TaskService use: */
	// let time_now = new Date().toISOString();
	// TaskService.postTask('Homework', 'Alex', 1300, time_now, function(task) {
	//   console.log('Task Posted');
	//   console.log(task);

	//   TaskService.getTask(1, function(task) {
	//     console.log('Task Retrieved');
	//     console.log(task);
	//   });
	//   TaskService.taskComplete([1], function(task) {
	//     console.log('Task Completed');
	//     console.log(task);
	//   });
	// });

	const [ tasks, setTasks ] = useState([]);
	const [ unscheduled, setUnscheduled ] = useState([]);
	const [ scheduled, setScheduled ] = useState([]);
	const [ listsOpen, setListsOpen ] = useState(2);

	const initDate = new Date();
	initDate.setTime(initDate.getTime() + 60 * 60 * 1000);
	initDate.setMinutes(0);

	const [ schedulingStart, setSchedulingStart ] = useState(initDate);
	const [ showSchedulingStart, setShowScheduling ] = useState(false);

	const [ creating, setCreating ] = useState(false);
	const [ selected, setSelected ] = useState([]);

	const history = useHistory();

	const splitTasks = () => {
		let schedArr = [],
			unschedArr = [];
		tasks.forEach((task) => {
			if (!task.completed) {
				if (task.scheduled) {
					schedArr.push(task);
				} else {
					unschedArr.push(task);
				}
			}
		});
		setUnscheduled(unschedArr);
		setScheduled(schedArr);
	};

	useEffect(() => {
		TaskService.getAllTasks((res) => {
			setTasks([ ...res.data.not_scheduled, ...res.data.scheduled ]);
		});
	}, []);

	useEffect(
		() => {
			/* split into scheduled and unscheduled every time tasks updates */
			splitTasks();
		},
		[ tasks ]
	);

	useEffect(
		() => {
			if (selected.length > 0) {
				setShowScheduling(true);
			} else {
				setShowScheduling(false);
			}
		},
		[ selected ]
	);

	const createTask = (task) => {
		const { name, description, duration, due_date } = task;
		TaskService.postTask(name, description, duration, due_date, (res) => {
			const task = res.data;
			setTasks(tasks.concat(task));
			setCreating(false);
		});
	};

	const selectTask = (id) => {
		if (selected.indexOf(id) === -1) {
			setSelected(selected.concat([ id ]));
		} else {
			setSelected(selected.filter((num) => num !== id));
		}
	};

	const deleteTask = (id) =>
		TaskService.taskDelete([ id ], (tasks) => setTasks(tasks.filter((task) => task.id !== id)));

	const editTask = (id, editedTask) => {
		TaskService.editTask(id, editedTask, (res) => {
			const task = res.task;
			const index = tasks.findIndex((x) => x.id === id);
			tasks[index] = task;
			setTasks(tasks);
		});
	};

	const completeTask = (id) =>
		TaskService.taskComplete([ id ], (completedTasks) =>
			completedTasks.data.forEach((completedTask) => {
				setTasks(tasks.map((task) => (task.id === completedTask.id ? completedTask : task)));
			})
		);

	const getCustomHeight = (other) => {
		let vh = 65;
		if (creating) {
			vh = 30;
		} else if (listsOpen === 2) {
			if (other.length > 1) {
				vh = 35;
			} else {
				vh = 55;
			}
		}
		return `${vh}vh`;
	};

	const getTrimmedHeight = () => {
		let vh = getCustomHeight(scheduled);
		if (showSchedulingStart) {
			return `calc(${vh} - 110px)`;
		} else return vh;
	};

	const scheduleButton = (
		<div>
			<div
				style={{
					width: '90%',
					margin: '0 auto',
					visibility: showSchedulingStart ? 'visible' : 'hidden',
					opacity: showSchedulingStart ? '1' : '0',
					height: showSchedulingStart ? '110px' : '0',
					transition: 'all 0.3s ease-in-out'
				}}
			>
				<Row>
					<p>When do you want to start scheduling?</p>
					<Icon
						src={'/close.svg'}
						onClick={() => {
							setShowScheduling(false);
							setSelected([]);
						}}
					/>
				</Row>
				<DateTimePicker value={schedulingStart} onChange={(e) => setSchedulingStart(e.target.value)} />
			</div>
			<FullButton
				primary={unscheduled.length}
				disabled={!unscheduled.length}
				onClick={() => {
					if (!showSchedulingStart) {
						setShowScheduling(true);
					} else {
						let selectedstr = '';
						if (selected.length) {
							selectedstr = selected.join(',');
						} else {
							selectedstr = unscheduled.map((elem) => elem.id).join(',');
						}
						schedulingStart.setSeconds(0, 0);
						history.push(`/scheduling/${selectedstr}?start=${schedulingStart.toISOString()}`);
					}
				}}
			>
				Schedule {selected.length ? selected.length : 'All'} {selected.length === 1 ? 'Task' : 'Tasks'}
			</FullButton>
		</div>
	);

	return (
		<div style={{ height: '90vh', overflowY: 'auto' }}>
			{creating ? (
				<Task task={emptyTask} deleteTask={() => setCreating(false)} createTask={createTask} creating />
			) : (
				''
			)}
			<TaskSection
				title="Not yet scheduled"
				emptyPrompt="No created tasks"
				emptyOpen={true}
				actionButton={scheduleButton}
				onToggle={(closed) => {
					if (closed) {
						setListsOpen((listsOpen) => listsOpen - 1);
					} else {
						setListsOpen((listsOpen) => listsOpen + 1);
					}
				}}
				customHeight={getTrimmedHeight()}
			>
				{unscheduled.map((task) => (
					<Task
						key={task.id}
						task={task}
						deleteTask={deleteTask}
						editTask={editTask}
						toggleSelect={selectTask}
						selected={selected.indexOf(task.id) !== -1}
					/>
				))}
			</TaskSection>
			<TaskSection
				title="Scheduled"
				emptyPrompt="No scheduled tasks"
				onToggle={(closed) => {
					if (closed) {
						setListsOpen((listsOpen) => listsOpen - 1);
					} else {
						setListsOpen((listsOpen) => listsOpen + 1);
					}
				}}
				customHeight={getCustomHeight(unscheduled)}
			>
				{scheduled.map((task) => (
					<Task key={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask} />
				))}
			</TaskSection>
			<FullButton
				onClick={() => {
					setCreating(true);
				}}
			>
				Create Task
			</FullButton>
		</div>
	);
};

export default TaskList;
