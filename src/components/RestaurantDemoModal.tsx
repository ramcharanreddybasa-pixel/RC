import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Phone, User, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Booking } from '../types.ts';

interface RestaurantDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestaurantDemoModal: React.FC<RestaurantDemoModalProps> = ({ isOpen, onClose }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'TB-101', name: 'Aarav Sharma', phone: '+91 98765 12345', date: todayStr, time: '07:30 PM', guests: '4' },
    { id: 'TB-102', name: 'Priya Patel', phone: '+91 98450 67890', date: todayStr, time: '07:30 PM', guests: '2' },
  ]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState('2');
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const MAX_TABLES_PER_SLOT = 3;

  const handleFillSample = () => {
    setName('Basa Ramcharan Reddy');
    setPhone('+91 98765 43210');
    setTime('06:00 PM');
    setGuests('2');
    setDate(todayStr);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time || !guests) {
      setAlert({ message: 'Please fill in all required reservation fields.', type: 'error' });
      return;
    }

    // Capacity verification
    const existingInSlot = bookings.filter((b) => b.date === date && b.time === time);
    if (existingInSlot.length >= MAX_TABLES_PER_SLOT) {
      setAlert({
        message: `Capacity limit reached: The ${time} slot on ${date} is booked to maximum (${MAX_TABLES_PER_SLOT} tables). Please select another time slot.`,
        type: 'error',
      });
      return;
    }

    const newBooking: Booking = {
      id: 'TB-' + Math.floor(100 + Math.random() * 900),
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
    };

    setBookings([newBooking, ...bookings]);
    setAlert({
      message: `Reservation confirmed for ${name.trim()} (Ref #${newBooking.id}, ${guests} guests on ${date} at ${time}).`,
      type: 'success',
    });
    setName('');
    setPhone('');
  };

  const handleCancelBooking = (id: string, guestName: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
    setAlert({
      message: `Reservation #${id} for ${guestName} has been cancelled. Capacity slot restored.`,
      type: 'success',
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] rounded-2xl shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-hairline)] bg-[var(--surface-card-subtle)]">
          <div>
            <div className="text-xs font-mono-code text-[var(--text-muted)] uppercase">
              Live Simulation · Python Backend Logic
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--text-primary)]">
              Restaurant Table Reservation Engine
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Constraint Engine: Active (3 tables/slot max)</span>
            </div>
            <a
              href="https://github.com/ramcharanreddybasa-pixel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>GitHub @ramcharanreddybasa-pixel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Select reservation parameters. The client-side simulation applies boundary validation, protects against slot overbooking, and manages state updates in real time.
          </p>

          {/* Feedback Alert */}
          {alert && (
            <div
              className={`p-3.5 rounded-lg text-xs font-mono-code flex items-start gap-2.5 border ${
                alert.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              {alert.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{alert.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)] flex items-center gap-1.5">
                <User className="w-3 h-3 text-[var(--accent-primary)]" />
                Customer Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Basa Ramcharan Reddy"
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)] flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[var(--accent-primary)]" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)] flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                Date
              </label>
              <input
                type="date"
                value={date}
                min={todayStr}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)] flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[var(--accent-primary)]" />
                Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                required
              >
                <option value="12:00 PM">12:00 PM (Lunch)</option>
                <option value="01:30 PM">01:30 PM (Lunch)</option>
                <option value="06:00 PM">06:00 PM (Dinner)</option>
                <option value="07:30 PM">07:30 PM (Dinner)</option>
                <option value="09:00 PM">09:00 PM (Dinner)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-mono-code text-[var(--text-secondary)] flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[var(--accent-primary)]" />
                Guest Count
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                required
              >
                <option value="1">1 Person</option>
                <option value="2">2 Guests (Couples)</option>
                <option value="4">4 Guests (Standard table)</option>
                <option value="6">6 Guests (Large table)</option>
                <option value="8">8 Guests (Banquet)</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-all shadow-sm cursor-pointer"
              >
                Confirm Reservation ↗
              </button>
              <button
                type="button"
                onClick={handleFillSample}
                className="px-4 py-2.5 rounded-lg text-xs font-mono-code border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] hover:bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Autofill Sample Data
              </button>
            </div>
          </form>

          {/* Ledger */}
          <div className="pt-5 border-t border-[var(--border-hairline)]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-mono-code font-bold uppercase text-[var(--text-primary)]">
                Active Reservation Ledger
              </div>
              <span className="text-xs font-mono-code text-[var(--text-muted)]">
                {bookings.length} reservations
              </span>
            </div>

            {bookings.length === 0 ? (
              <div className="text-xs font-mono-code text-[var(--text-muted)] text-center py-6 border border-dashed border-[var(--border-hairline)] rounded-lg">
                No active bookings. Use the form above to reserve.
              </div>
            ) : (
              <div className="space-y-2">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card-subtle)] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <span>{b.name}</span>
                        <span className="text-xs font-mono-code text-[var(--text-muted)]">
                          ({b.guests} Guests)
                        </span>
                      </div>
                      <div className="text-xs font-mono-code text-[var(--text-secondary)] mt-0.5">
                        Ref: <strong className="text-[var(--text-primary)]">#{b.id}</strong> · {b.date} · {b.time}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCancelBooking(b.id, b.name)}
                      className="px-3 py-1 rounded-md text-xs font-mono-code text-rose-500 hover:text-rose-600 border border-rose-500/20 hover:border-rose-500/40 bg-rose-500/5 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
