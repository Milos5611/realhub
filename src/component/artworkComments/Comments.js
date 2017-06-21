import { Card, CardHeader, CardText } from "material-ui/Card";
import { Component, PropTypes } from "react";
import { fullBlack, fullWhite, greenA700 } from "material-ui/styles/colors";
import AddIcon from "material-ui/svg-icons/content/add";
import Badge from "material-ui/Badge";
import Divider from "material-ui/Divider";
import EmailIcon from "material-ui/svg-icons/communication/email";
import NotificationIcon from "material-ui/svg-icons/social/notifications";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import RemoveIcon from "material-ui/svg-icons/content/remove";
import SystemUpdate from "material-ui/svg-icons/action/system-update-alt";
import { style } from "../../app/constant";
export default class Comment extends Component {

    constructor( props ) {
        super(props);
        this.handleOpen = ::this.handleOpen;
        this.handleClose = ::this.handleClose;
        this.renderComment = ::this.renderComment;
        this.handleSetAcknowledged = ::this.handleSetAcknowledged;
    }

    handleSetAcknowledged( id ) {
        this.props.acknowledge(id);
    }

    handleOpen() {
        this.props.loadComments();
    }

    handleClose() {
        this.props.openComments(false);
    }

    render() {
        const { data, open } = this.props;
        return (
            <Paper style={style}
                   zDepth={5}
                   className="cards-wrapper"
            >
                {this.renderTopButtonMenu(data)}
                {data && data.length ? this.renderComment(data) : null}
                {open ?
                    <RaisedButton label="Mark As Approved"
                                  style={style.buttonSubmit}
                                  fullWidth
                                  backgroundColor={greenA700}
                                  labelColor={fullWhite}
                    /> : null}
            </Paper>
        );
    }

    renderTopButtonMenu(data) {
        const { open, numberOfAcknowledgedComment } = this.props;
        return (
            <div className="button-wrapper">
                <RaisedButton label="Download File"
                              icon={<SystemUpdate/>}
                              style={style.buttons}
                />
                <RaisedButton label="Share Proof"
                              icon={<EmailIcon/>}
                              style={style.buttons}
                />
                <RaisedButton icon={<AddIcon/>}
                              style={style.buttons}
                />
                <RaisedButton label={"150%"}
                              style={style.buttons}
                />
                <RaisedButton icon={<RemoveIcon/>}
                              style={style.buttons}
                />
                <Badge badgeContent={numberOfAcknowledgedComment}
                       primary={!!numberOfAcknowledgedComment}
                >
                    <RaisedButton onTouchTap={open ? this.handleClose : this.handleOpen}
                                  backgroundColor={data && data.every(d => d.acknowledged === true) ? "rgb(255, 255, 255)" : "#02b7e2"}
                                  style={style.buttons}
                                  icon={
                                      <NotificationIcon
                                          color={data && data.every(d => d.acknowledged === true) ? fullBlack : fullWhite}
                                      />}
                    />
                </Badge>
            </div>
        );
    }

    renderComment( data ) {
        return data.map(( currentUser ) => {
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
                               onClick={() => this.handleSetAcknowledged(currentUser.id)}
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
    "acknowledge": PropTypes.func,
    "numberOfAcknowledgedComment": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
