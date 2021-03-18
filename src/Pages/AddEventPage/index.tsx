import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import ModalDialog from '../../Components/ModalDialog';
import Menu from '../../Components/Menu/Menu';
import { ModalTitle, ModalForm, Label, Input, AlertError, AlertSuccess } from '../../Components/styledComponents';
import mapMembers from '../../utils/mapMembers';
import Data from '../../utils/data';
import { dayLabel, timeLabel, message, EVENTS, MAIN_URL } from '../../constants/constants';
import { Events, Members } from '../../Redux/interfaces';

const ModalRow = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-of-type {
    margin-top: 2rem;
  }
`;

const Button = styled.input`
  display: block;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 1px;
  height: 3.8rem;
  width: 12rem;
  line-height: 3.8rem;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
  border: 0;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
    cursor: auto;
  }
`;

const SubmitBtn = styled.button`
  display: block;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 1px;
  height: 3.8rem;
  width: 12rem;
  line-height: 3.8rem;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
  border: 0;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.1);
    cursor: auto;
  }
`;

const Span = styled.span``;

const ModalCloseBtn = styled(NavLink)`
  display: flex;
  text-decoration: none;
  align-items: baseline;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: -2rem;
  right: -2rem;
  border-radius: 50%;
  border: 1px solid #979797;
  background: transparent;
  font-size: 2.5rem;
  color: #979797;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #d8093a;
    box-shadow: 0 0.5rem 1.5rem rgba(black, 0.1);
  }
`;

interface AddEventPageProps {
  users: Members[];
}

const AddEventPage: React.FC<AddEventPageProps> = ({ users }) => {
  const buttonSubmitRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [eventName, setEvent] = useState('');
  const [receivedParticipants, setParticipants] = useState('');
  const [receivedDay, setDay] = useState('');
  const [receivedTime, setTime] = useState('');
  const [isShowAlert, setAlert] = useState('');
  const [isShowSuccess, setSuccess] = useState('');

  const showParticipants = (str: string): void => {
    if (str) {
      setParticipants(str);
    }
  };

  const showTime = (str: string): void => {
    if (str) {
      setTime(str);
    }
  };

  const showDay = (str: string): void => {
    if (str) {
      setDay(str);
    }
  };

  const handleChangeEvent = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    setEvent(target.value);
  };

  // Handle click Button
  const setInitialButtonState = () => {
    (buttonSubmitRef.current as HTMLButtonElement).classList.remove('state-1', 'state-2', 'animated');
  };

  const finalButtonMsg = () => {
    (buttonSubmitRef.current as HTMLButtonElement).classList.add('state-2');

    setTimeout(setInitialButtonState, 2000);
  };

  const updateButtonMsg = () => {
    (buttonSubmitRef.current as HTMLButtonElement).classList.add('state-1', 'animated');

    setTimeout(finalButtonMsg, 2000);
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const minLengthInput = 2;
    const inputEvent = eventName.trim();
    const newMembers = receivedParticipants.split(' ');
    const newDay = receivedDay.trim();
    const newTime = receivedTime.trim();
    let isLoad = false;

    // Check input
    switch (true) {
      case (inputEvent.length < minLengthInput): {
        setAlert(message.noEvent);

        setTimeout(() => setAlert(''), 2000);
        break;
      }

      case (!newMembers.length): {
        setAlert(message.noMember);

        setTimeout(() => setAlert(''), 2000);
        break;
      }

      case (!newDay): {
        setAlert(message.noDay);

        setTimeout(() => setAlert(''), 2000);
        break;
      }

      case (!newTime): {
        setAlert(message.noTime);

        setTimeout(() => setAlert(''), 2000);
        break;
      }

      default: {
        const newEvent = {
          id: nanoid(),
          title: inputEvent,
          participants: [...newMembers],
          day: newDay,
          time: newTime,
          complete: true,
        };

        const existEvents = JSON.parse(String(localStorage.getItem(EVENTS)));

        const newEvents = existEvents.map((eventItem: Events) => {
          const { day, time, title } = eventItem;
          const condition = newDay.toLowerCase() === day.toLowerCase() && newTime.toLowerCase() === time.toLowerCase();

          if (condition && title) {
            setAlert(message.failure);
            isLoad = false;

            setTimeout(() => setAlert(''), 2000);
          } else if (condition && !title) {
            isLoad = true;

            return newEvent;
          }

          return eventItem;
        });

        if (isLoad) {
          updateButtonMsg();
          new Data(MAIN_URL).sendData(EVENTS, newEvents)
            .then(() => {
              localStorage.setItem(EVENTS, JSON.stringify(newEvents));
              setSuccess(message.success);

              setTimeout(() => setSuccess(''), 2000);
            })
            .catch((err) => {
              setAlert(err.message);

              setTimeout(() => setAlert(''), 2000);
            })
            .finally(() => {
              setEvent('');
            });
        }
        break;
      }
    }
  };

  const handleClearForm = (): void => {
    setEvent('');
  };

  useEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  return (
    <ModalDialog addClass={!!false}>
      <ModalTitle>
        Create New Event
    </ModalTitle>
      <ModalForm name='create-event' onSubmit={handleSubmitForm}>
        <ModalRow>
          <Label htmlFor='eventName'>
            Name of Event
        </Label>
          <Input
            id='eventName'
            ref={inputRef}
            type='text'
            tab-index='0'
            name='event-name'
            placeholder='add event'
            value={eventName}
            onChange={handleChangeEvent}
          />
        </ModalRow>
        <ModalRow>
          <Label>
            Participants
        </Label>
          <Menu
            data={mapMembers(users)}
            isCheckbox={!!true}
            showTitle={showParticipants}
          />
        </ModalRow>
        <ModalRow>
          <Label>
            Day
        </Label>
          <Menu
            data={dayLabel.slice(1)}
            showTitle={showDay}
          />
        </ModalRow>
        <ModalRow>
          <Label>
            Time
        </Label>
          <Menu
            data={timeLabel}
            showTitle={showTime}
          />
        </ModalRow>
        <ModalRow>
          <SubmitBtn
            ref={buttonSubmitRef}
            className='submit-button state-0'
            type='submit'
            value='Submit'
            name='modal-submit'
            tab-index='0'
            aria-label='Submit'
          >
            <Span className='pre-state-msg'>Submit</Span>
            <Span className='current-state-msg hide'>Sending...</Span>
            <Span className='done-state-msg hide'>Done!</Span>
          </SubmitBtn>
          <Button
            className='cancel-button'
            type='button'
            value='Cancel'
            name='modal-cancel'
            tab-index='0'
            aria-label='Cancel'
            onClick={handleClearForm}
          />
        </ModalRow>
      </ModalForm>
      <ModalCloseBtn to='/'>
        &times;
      </ModalCloseBtn>
      {isShowAlert
        && <AlertError>
          {isShowAlert}
        </AlertError>
      }
      {isShowSuccess
        && <AlertSuccess>
          {isShowSuccess}
        </AlertSuccess>}
    </ModalDialog>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.users,
});

export default connect(mapStateToProps)(AddEventPage);
