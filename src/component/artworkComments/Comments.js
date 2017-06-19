import {Card, CardHeader, CardText} from "material-ui/Card";
import {Component, PropTypes} from "react";
import React from "react";
export default class Comment extends Component {
    
    constructor(props) {
        super(props);
        this.handleOpen = ::this.handleOpen;
        this.handleClose = ::this.handleClose;
        this.renderComment = ::this.renderComment;
    }
    
    handleOpen() {
        this.props.loadComments();
    }
    
    handleClose() {
        this.props.openComments(false);
    }
    
    render() {
        const {data, open} = this.props;
        return (
            <div>
                {data && data.length ? this.renderComment(data) : null}
                <button onClick={open ? this.handleClose : this.handleOpen}/>
            </div>
        );
    }
    
    renderComment(data) {
        return data.map((currentUser) => {
            return (
                <Card key={currentUser.id}
                      expanded
                >
                    <CardHeader
                        title={currentUser.user.full_name}
                        subtitle={currentUser.body}
                        avatar={currentUser && currentUser.user.image.square_url}
                    />
                    <CardText>
                        <p>{currentUser.dates.created.date_time}</p>
                        <p>{!currentUser.acknowledged ? <a href="#">{"Mark as seen"}</a> : null}</p>
                    </CardText>
                </Card>
            );
        });
    }
}

Comment.propTypes = {
    "data": PropTypes.array,
    "open": PropTypes.bool,
    "loadComments": PropTypes.func,
    "openComments": PropTypes.func
};
