import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "../../Components/Button";
import {Close} from "@mui/icons-material";
import axios from "axios";


const UserProfileWrapper = styled.div`
    background: #f9f9f9;
    min-height: calc(100vh - 77px - 62px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2em 0;
    position: relative;

    &::before {
        content: "";
        background-image: url("https://images.pexels.com/photos/8473454/pexels-photo-8473454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        height: 250px;
        width: 100%;
    }

    @media (max-width: 600px) {
        min-height: calc(100vh - 60px - 62px);
    }

    .user-details-container {
        padding: 2em;
        z-index: 3;
        width: 100%;
        max-width: 800px;
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.5);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .user-details-container h2 {
        position: relative;
        z-index: 1;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-style: italic;
    }

    .user-details-container h2::after {
        content: "";
        position: absolute;
        z-index: 1;
        width: 100px;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #000000;
    }

    .user-details {
        padding-top: 1em;
    }

    .user-details-item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 2em;
    }

    .action-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .user-details-item label {
        font-size: 15px;
        letter-spacing: 1px;
    }

    .user-details-item input {
        width: 100%;
        padding: 10px 5px;
        background: none;
        border: none;
        border-bottom: 1px solid #8a8a8a;
        font-size: 15px;
        outline: none;
    }
`;

export default function Profile() {

    const [error, setError] = useState('');

    const [response, setResponse] = useState('');

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            address: "",
            apartment: "",
            city: "",
            postalCode: ""
        }
    });

    const handleChangeUser = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    };

    const handleChangeAddress = (e) => {
        const {name, value} = e.target;
        setUser({...user, address: {...user.address, [name]: value}})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.put('http://localhost:5000/update-user', {user})
            .then(() => {
                setError('')
                setResponse('Profile is updated successfully.')
            })
            .catch((error) => {
                setResponse('')
                setError(error.message)
            })
    }

    useEffect(() => {

        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/get-user')
            .then(res => {

                const {name, email, phone, address} = res.data.user;

                setError('');
                setUser({name, email, phone, address: address || {}});
            })
            .catch(error => {
                setError(error.message);
            })
        setResponse('')
    }, []);

    return (
        <UserProfileWrapper>
            <div className="user-details-container">
                <h2>User Profile</h2>
                <div className="user-details">
                    <form onSubmit={handleSubmit}>
                        <div className="user-details-item">
                            <label>Name</label>
                            <input
                                type="text"
                                defaultValue={user.name}
                                name="name"
                                onChange={handleChangeUser}
                                required
                            />
                        </div>
                        <div className="user-details-item">
                            <label>Email</label>
                            <input
                                type="email"
                                defaultValue={user.email}
                                name="email"
                                onChange={handleChangeUser}
                                required
                            />
                        </div>
                        <div className="user-details-item">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                defaultValue={user.phone}
                                name="phone"
                                onChange={handleChangeUser}
                                required
                            />
                        </div>
                        <div className="user-details-item">
                            <label>Address</label>
                            <input
                                type="text"
                                defaultValue={user.address.address}
                                name="address"
                                onChange={handleChangeAddress}
                                required
                            />
                        </div>
                        <div className="user-details-item">
                            <label>Apartment (Optional)</label>
                            <input
                                type="text"
                                defaultValue={user.address.apartment}
                                name="apartment"
                                onChange={handleChangeAddress}
                            />
                        </div>
                        <div className="user-details-item"
                             style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                            <div>
                                <label>City</label>
                                <input
                                    type="text"
                                    defaultValue={user.address.city}
                                    name="city"
                                    onChange={handleChangeAddress}
                                    required
                                />
                            </div>
                            <div>
                                <label>Postal Code</label>
                                <input
                                    type="number"
                                    min={0}
                                    defaultValue={user.address.postalCode}
                                    name="postalCode"
                                    onChange={handleChangeAddress}
                                    required
                                />
                            </div>

                        </div>
                        <div className="action-buttons">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                    <ChangePassword/>
                    {error && <p style={{color: "rgb(220,0,0)", alignItems: "center"}}>{error}</p>}
                    {response && <p style={{color: "rgb(18,176,0)", alignItems: "center"}}>{response}</p>}
                </div>
            </div>
        </UserProfileWrapper>
    )
}


function ChangePassword() {

    const [open, setOpen] = React.useState(false);

    const [error, setError] = useState('');

    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.put('http://localhost:5000/password', {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        })
            .then((res) => {
                setError('')
                handleClose()
            })
            .catch((error) => {
                if (error.response) setError(error.response.data.message)
                else setError(error.message)
            })
    }

    return (
        <React.Fragment>
            <p onClick={handleClickOpen} style={{cursor: 'pointer'}}>Change Password</p>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    method: 'post',
                    onSubmit: handleSubmit
                }}
            >
                <div className="dialog-top-header"
                     style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <DialogTitle>Create New Password</DialogTitle>
                    <Close sx={{marginRight: "24px"}} onClick={handleClose}/>
                </div>

                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="current-password"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="new-password"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        error={data.newPassword !== data.confirmPassword}
                        autoComplete="new-password"
                        color={data.newPassword === data.currentPassword ? "success" : ""}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="confirm-password"
                        name="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        error={data.newPassword !== data.confirmPassword}
                        autoComplete="confirm-password"
                        helperText={data.newPassword !== data.confirmPassword ? 'Password does not match' : ''}
                        color={data.newPassword === data.currentPassword ? "success" : ""}
                    />
                </DialogContent>
                <DialogActions sx={{justifyContent: "center"}}>
                    <Button type="submit">Change Password</Button>
                </DialogActions>
                {
                    error &&
                    <p style={{
                        color: "rgb(220, 15, 15)",
                        textAlign: "center",
                        padding: "0.5em 0 1em"
                    }}>{error}</p>
                }
            </Dialog>
        </React.Fragment>
    )
}