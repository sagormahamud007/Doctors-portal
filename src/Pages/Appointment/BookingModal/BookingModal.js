import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../Context/ContextProvider';
import toast from 'react-hot-toast';


const BookingModal = ({ treatment, selectedDate, setTreatment, refetch, }) => {
    const { user } = useContext(AuthContext)
    const { slots, name: treatmentName, price } = treatment;
    const date = format(selectedDate, 'PP')

    const handleBooking = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;
        console.log(name, email, phone, slot);

        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patient: name,
            email,
            phone,
            slot,
            price
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('booking confirmed')
                    form.reset('')
                    setTreatment(null)
                    refetch()
                }

            })
    }

    return (
        <div>
            <input type="checkbox" id="My-Booking" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="My-Booking" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='mt-10 grid grid-cols-1 gap-4'>
                        <input type="text" name='date' disabled defaultValue={date} className="input input-bordered w-full" />

                        <select name='slot' className="select w-full input-bordered">
                            {

                                slots.map((slot, i) => <option
                                    key={i}
                                    value={slot}>{slot}</option>)
                            }
                        </select>

                        <input type="text" name='name' placeholder="Your name" defaultValue={user?.displayName} disabled className="input input-bordered w-full" />
                        <input type="email" disabled defaultValue={user?.email} name='email' placeholder="E-mail Address" className="input input-bordered w-full" />
                        <input type="number" placeholder="Your phone" name='phone' className="input input-bordered w-full" />
                        <input disabled={slots.length === 0}
                            className='w-full bg-accent py-3 text-white' type="submit" value="SUBMIT" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;