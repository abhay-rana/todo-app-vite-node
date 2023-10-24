import { connect } from 'react-redux';

const DebounceScreen = (props) => {
    return (
        <>
            <div>DebounceScreen</div>
            {/* <input
                value={props.search}
                onChange={(e) => props.Set_Search('search', e.target.value)}
            /> */}
        </>
    );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DebounceScreen);
