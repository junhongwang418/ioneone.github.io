import React from "react";
import {createStyles, Theme, WithStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: theme.spacing(16)
  },
  font: {
    fontWeight: "bold",
    lineHeight: "5rem"
  },
  link: {
    color: theme.palette.background.default,
    textDecoration: "none",
    textShadow: `-1px -1px 0 ${theme.palette.text.primary}, 1px -1px 0 ${theme.palette.text.primary}, -1px 1px 0 ${theme.palette.text.primary}, 1px 1px 0 ${theme.palette.text.primary}`,
    transition: "color 0.5s ease",
    "&:hover": {
      color: theme.palette.primary.main,
      textShadow: "none",
      transition: "none",
    }
  }
});

interface ContactProps extends WithStyles<typeof styles> {}

class Contact extends React.Component<ContactProps> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.font} variant="h2">
          check out my <a className={classes.link} href="" target="_blank">resume</a>,
          <br />
          <a className={classes.link} href="" target="_blank">CV</a>,
          and <a className={classes.link} href="https://github.com/ioneone" target="_blank">Github</a>
          <br /><br />
          hit me up on <a className={classes.link} href="https://www.linkedin.com/in/junhong-wang/" target="_blank">LinkedIn</a>,
          <br />
          <a className={classes.link} href="https://www.instagram.com/toshihiro_wan/" target="_blank">Instagram</a> or <a className={classes.link} href="mailto:ionejunhong@gmail.com">email</a>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Contact);
