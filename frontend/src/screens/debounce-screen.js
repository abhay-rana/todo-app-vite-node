import { connect } from 'react-redux';

import { SetSearch } from '~/actions/home-actions';

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
const mapDispatchToProps = (dispatch) => ({
    Set_Search: (key, value) => dispatch(SetSearch(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebounceScreen);
