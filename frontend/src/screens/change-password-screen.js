import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChangePasswordDatabase } from '~/redux/actions/auth-actions';

const ChangePasswordScreen = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState({
        old_password: '',
        password: '',
        confirm_password: '',
    });

    function changePassword(key, value) {
        setPassword({ ...password, [key]: value });
    }

    function changePasswordDatabase() {
        dispatch(ChangePasswordDatabase({ ...password }));
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-6">
                <div>Change Password Screen</div>
                <div className="flex flex-col gap-4">
                    <input
                        value={password.old_password}
                        onChange={(event) =>
                            changePassword('old_password', event.target.value)
                        }
                        placeholder="Enter Old Password"
                    />
                    <input
                        value={password.password}
                        onChange={(event) =>
                            changePassword('password', event.target.value)
                        }
                        placeholder="Enter Password"
                    />
                    <input
                        value={password.confirm_password}
                        onChange={(event) =>
                            changePassword(
                                'confirm_password',
                                event.target.value
                            )
                        }
                        placeholder="Enter confirm Password"
                    />
                </div>
                <div>
                    <button
                        onClick={changePasswordDatabase}
                        className="bg-success p-2 "
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordScreen;
