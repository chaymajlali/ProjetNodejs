"use client";

import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  // Charger les événements depuis localStorage
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

  // Sauvegarder les événements dans localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(currentEvents));
  }, [currentEvents]);

  // Gérer le clic sur une date du calendrier
  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  // Fermer la boîte de dialogue
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  // Ajouter un événement
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      // Mettre à jour les événements
      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);

      // Fermer la boîte de dialogue
      handleCloseDialog();
    }
  };

  // Supprimer un événement
  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'événement "${selected.event.title}" ?`
      )
    ) {
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selected.event.id)
      );
    }
  };

  // Fonction pour personnaliser l'affichage des événements dans chaque case
  const eventContent = (eventInfo: any) => {
    return (
      <div className="fc-event-main">
        <p>{eventInfo.event.title}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendrier */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow-md">
          <FullCalendar
            height="70vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
            eventContent={eventContent} // Utiliser la fonction de rendu personnalisée
          />
        </div>

        {/* Liste des événements */}
        <div className="lg:col-span-7 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Upcoming Events
          </h2>
          {currentEvents.length === 0 ? (
            <p className="text-gray-500 italic">No events planned</p>
          ) : (
            <ul className="space-y-3">
              {currentEvents.map((event) => (
                <li
                  key={event.id}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <p className="font-medium text-blue-800">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add an event
          </button>
        </div>
      </div>

      {/* Boîte de dialogue pour ajouter un événement */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b">
            <DialogTitle className="text-xl font-semibold text-blue-800">
              Add a new event
            </DialogTitle>
          </div>
          <form onSubmit={handleAddEvent} className="space-y-4 p-4">
            <input
              type="text"
              placeholder="Title of event"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
