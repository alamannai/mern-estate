import React, { useState } from 'react'
import { Calendar as Cal, Whisper, Popover, Badge , Modal, ButtonToolbar, DatePicker  } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { useSelector, useDispatch } from 'react-redux'

function getTodoList(date) {
  const day = date.getDate();
  const {currentUser} = useSelector(state => state.user)
  switch (day) {
    case 14:
      return currentUser.admin? [
        { time: '10:30 am', title: 'Rendez-vous : Salah' },
        { time: '12:00 pm', title: 'Rendez-vous : Mohamed' }
      ]: [];
    case 23:
      return currentUser.admin?[
        { time: '09:30 pm', title: 'Rendez-vous : Ali' },
        { time: '12:30 pm', title: 'Rendez-vous : Fatma' },
        { time: '02:00 pm', title: 'Rendez-vous : Mariem' },
        { time: '12:30 pm', title: 'Rendez-vous : Moez' },
        { time: '02:00 pm', title: 'Rendez-vous : Riadh' },
      ]: [
        { time: '10:30 am', title: 'Rendez-vous' }
      ];
    default:
      return [];
  }
}

function renderCell(date) {
  const list = getTodoList(date);
  const displayList = list.filter((item, index) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          //trigger="click"
          speaker={
            <Popover>
              {list.map((item, index) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <span>{moreCount} Plus</span>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item, index) => (
          <li key={index}>
            <Badge /> <b>{item.time}</b> - {item.title}
          </li>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}

export default function Calendar() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading ] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='bg-white rounded-lg'>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Prendre un rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker format="HH:mm" />
        </Modal.Body>
        <Modal.Footer >

        <form onClick={handleClose} className='flex flex-row-reverse'>
          <button onClick={handleClose}
            className="w-24 bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300 disabled:opacity-80"
          >
            {'Annuler'}
          </button>
          <button disabled={loading} 
            className="w-24 bg-indigo-600 text-white p-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300 disabled:opacity-80 mx-6"
          >
            {'Ok'}
          </button>
          
        </form>
        </Modal.Footer>
      </Modal>
      <Cal bordered renderCell={renderCell}  onSelect={currentUser.admin === false && handleOpen} />
    </div>
  )
}
