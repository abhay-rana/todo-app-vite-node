import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { useLocation } from 'wouter';

const HomeScreen = (props) => {
    return (
        <>
            <div className="flex flex-col border-2 border-black">
                This is HomeScreen running on vercel Yes Man..
                <div className="flex w-24 cursor-pointer flex-col gap-4"></div>
                <div>
                    <div className="">Counter Applications</div>
                    <button
                        onClick={() => props.Increment_Counter()}
                        className="rounded-lg bg-red-400 p-2"
                    >
                        +
                    </button>
                    {props.counter}
                    <button
                        onClick={() => props.Decrement_Counter()}
                        className="rounded-lg bg-green-400 p-2"
                    >
                        -
                    </button>
                </div>
                <div className="flex flex-col border-1 border-red-500">
                    <div className="text-center">Toast renderings</div>
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={() => {
                                toast.dismiss();
                                toast('message');
                            }}
                        >
                            normal toast
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(null, null)(HomeScreen);
