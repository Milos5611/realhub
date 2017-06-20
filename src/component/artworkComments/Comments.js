import {Card, CardHeader, CardText} from "material-ui/Card";
import {PropTypes, PureComponent} from "react";
import AddIcon from "material-ui/svg-icons/content/add";
import Divider from "material-ui/Divider";
import EmailIcon from "material-ui/svg-icons/communication/email";
import NotificationIcon from "material-ui/svg-icons/social/notifications";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import RemoveIcon from "material-ui/svg-icons/content/remove";
import SystemUpdate from "material-ui/svg-icons/action/system-update-alt";
import {style} from "../../app/constant";
export default class Comment extends PureComponent {
    
    constructor(props) {
        super(props);
        this.handleOpen = ::this.handleOpen;
        this.handleClose = ::this.handleClose;
        this.renderComment = ::this.renderComment;
        this.handleSetAcknowledged = ::this.handleSetAcknowledged;
    }
    
    handleSetAcknowledged(id) {
        this.props.acknowledge(id);
    }
    
    handleOpen() {
        this.props.loadComments();
    }
    
    handleClose() {
        this.props.openComments(false);
    }
    
    render() {
        const {data} = this.props;
        return (
            <div className="cards-wrapper">
                {this.renderTopButtonMenu()}
                {data && data.length ? this.renderComment(data) : null}
            </div>
        );
    }
    
    renderTopButtonMenu() {
        return (
            <div className="button-wrapper">
                <RaisedButton label="Download File"
                              icon={<SystemUpdate/>}
                              style={style.button}
                />
                <RaisedButton label="Share Proof"
                              icon={<EmailIcon/>}
                              style={style.button}
                />
                <RaisedButton icon={<AddIcon/>}
                              style={style.button}
                />
                <RaisedButton label={"150%"}
                              style={style.button}
                />
                <RaisedButton icon={<RemoveIcon/>}
                              style={style.button}
                />
                <RaisedButton icon={<NotificationIcon/>}
                              onTouchTap={this.props.open ? this.handleClose : this.handleOpen}
                              style={style.button}
                />
            </div>
        );
    }
    
    renderComment(data) {
        return data.map((currentUser) => {
            return (
                <Card key={currentUser.id}
                      expanded
                      className={("card ") + (this.props.open ? "open" : "closed")}
                >
                    <CardHeader
                        title={currentUser.user.full_name}
                        subtitle={currentUser.body}
                        avatar={currentUser && currentUser.user.image.square_url}
                    />
                    <CardText>
                        <p className="date">{currentUser.dates.created.date_time}</p>
                        {!currentUser.acknowledged ?
                            <a href="#"
                               className="link"
                               onClick={() => this.handleSetAcknowledged(currentUser.artwork_id)}
                            >{"Mark as seen"}</a> : null}
                    </CardText>
                    <Divider/>
                </Card>
            );
        });
    }
}

Comment.propTypes = {
    "data": PropTypes.array,
    "open": PropTypes.bool,
    "loadComments": PropTypes.func,
    "openComments": PropTypes.func,
    "acknowledge": PropTypes.func
};
