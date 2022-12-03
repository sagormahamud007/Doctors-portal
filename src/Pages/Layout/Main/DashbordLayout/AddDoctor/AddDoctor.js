
import { useQuery } from '@tanstack/react-query';
import { stringify } from 'postcss';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const imageHostKey = process.env.REACT_APP_imgbb_key;


    const navigate = useNavigate()

    const { data: specialtyes, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json();
            return data;
        }


    })
    if (isLoading) {
        return <h3>Loading...</h3>
    }


    const handleAddDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    //save information to the database
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('Token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${data.name} is added successfully`)
                            navigate('/dashboard/manageDoctors')
                        })
                }
            })

    }

    return (
        <div>

            <div className='h-[500px]'>
                <div className='w-96 p-7'>
                    <h1 className='text-4xl text-primary'>Add a doctor</h1>
                    <form onSubmit={handleSubmit(handleAddDoctor)} >
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" {...register("name", {
                                required: 'Must be your name'
                            })} className="input input-bordered w-full max-w-xs" />
                            <span>{errors.name && <p className='text-red-600'>{errors.name?.message}</p>}</span>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" {...register("email",
                                {
                                    required: 'Email is required'
                                })} className="input input-bordered w-full max-w-xs" />
                            <span>{errors.email && <p className='text-red-600'>{errors.email?.message}</p>}</span>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">specialty</span></label>
                            <select
                                {...register('specialty')}
                                className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select your specialty</option>
                                {
                                    specialtyes.map(specialty => <option
                                        key={specialty._id}
                                        value={specialty.name}
                                    >{specialty.name}</option>)
                                }

                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Photo</span></label>
                            <input type="file" {...register("image", {
                                required: 'Must be your photo'
                            })} className="input input-bordered w-full max-w-xs" />
                            <span>{errors.name && <p className='text-red-600'>{errors.name?.message}</p>}</span>
                        </div>

                        <input className='btn btn-accent w-full mt-5' value='Add Doctor' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;