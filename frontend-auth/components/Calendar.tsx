"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";

// Dialog component
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">{children}</div>
);

const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-semibold text-blue-800">{children}</h2>
);

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      try {
        setCurrentEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error("Erreur lors du chargement des événements :", error);
        localStorage.removeItem("events");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(currentEvents));
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end || selectedDate.start,
        allDay: selectedDate.allDay,
      };

      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);

      try {
        await fetch("http://localhost:7000/api/email/sendemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "mhatli.chaima94@gmail.com",
            subject: `New Appointment: ${newEventTitle}`,
            message: `You have a new appointment scheduled on ${formatDate(newEvent.start, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}.`,
          }),
        });
        console.log("📩 Email sent successfully!");
      } catch (error) {
        console.error("❌ Error sending email:", error);
      }

      handleCloseDialog();
    }
  };

  const handleEventClick = async (selected: EventClickArg) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${selected.event.title}" ?`)) {
      const eventToDelete = selected.event;

      // Remove the event from the list
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventToDelete.id)
      );

      try {
        await fetch("http://localhost:7000/api/email/sendemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "mhatli.chaima94@gmail.com",
            subject: `Event Deleted: ${eventToDelete.title}`,
            message: `The event "${eventToDelete.title}" scheduled on ${formatDate(eventToDelete.start, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} has been deleted.`,
          }),
        });
        console.log("📩 Email sent successfully for deleted event!");
      } catch (error) {
        console.error("❌ Error sending email for event deletion:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-md">
          <FullCalendar
            height="70vh"
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Upcoming Events</h2>
          {currentEvents.length === 0 ? (
            <p className="text-gray-500 italic">No events planned</p>
          ) : (
            <ul className="space-y-3">
              {currentEvents.map((event) => (
                <li key={event.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-800">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Add a new event</DialogTitle>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              placeholder="Title of event"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
