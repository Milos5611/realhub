import {
    DATA,
    OPEN,
    acknowledge,
    loadComments,
    openComments
} from "../ducks/comments";
import Comments from "../component/artworkComments/Comments";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        "data": state.comments[DATA],
        "open": state.comments[OPEN]
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadComments,
        openComments,
        acknowledge
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
