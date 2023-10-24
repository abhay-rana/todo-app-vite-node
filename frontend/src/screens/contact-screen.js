import React from 'react';
import { connect } from 'react-redux';
import {
    IncreaseContainerCounter,
    SetContainerDetails,
} from '~/redux/slices/container-reducer';

import ContactComponent from '~/components/contact-component';

const ContactScreen = (props) => {
    return (
        <>
            <div>ContactScreen</div>
            <React.Suspense fallback={<h1>Spinner....</h1>}>
                <ContactComponent />
            </React.Suspense>
            <div className="border border-success">
                <div className="flex flex-col gap-4">
                    <input
                        value={props.name}
                        placeholder="enter name"
                        onChange={(event) =>
                            props.SetContainerDetails(
                                'name',
                                event.target.value
                            )
                        }
                    />
                    <input
                        value={props.city}
                        placeholder="enter city"
                        onChange={(event) =>
                            props.SetContainerDetails(
                                'city',
                                event.target.value
                            )
                        }
                    />
                    <button onClick={() => props.IncreaseContainerCounter()}>
                        Increase Count:{props.counter}
                    </button>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    name: state.container_store.name,
    city: state.container_store.city,
    counter: state.container_store.counter,
});
const mapDispatchToProps = (dispatch) => ({
    SetContainerDetails: (key, value) =>
        dispatch(SetContainerDetails({ key, value })),
    IncreaseContainerCounter: () => dispatch(IncreaseContainerCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
