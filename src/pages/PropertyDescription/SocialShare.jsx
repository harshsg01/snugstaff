import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { IconButton, Stack, styled } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    paddingBlock: theme.spacing(3),
    width: "500px",
  },
  "& .MuiPaper-root": {
    borderRadius: "20px",
  },
  "& .MuiDialogActions-root": {
    borderTop: "1px solid #ebebeb",
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  "& .MuiDialogTitle-root": {
    borderBottom: "1px solid #ebebeb",
    textAlign: "center",
    display: "flex",
    fontWeight: 400,
    fontSize: "1.3rem",
    justifyContent: "center",
    alignItems: "center",
  },
  zIndex: 10000,
}));

const socialShareData = [
  { shareButton: <EmailShareButton />, icon: <EmailIcon />, label: "Email" },
  {
    shareButton: <FacebookShareButton />,
    icon: <FacebookIcon />,
    label: "Facebook",
  },
  {
    shareButton: <LinkedinShareButton />,
    icon: <LinkedinIcon />,
    label: "LinkedIn",
  },
  {
    shareButton: <PinterestShareButton />,
    icon: <PinterestIcon />,
    label: "Pinterest",
  },
  {
    shareButton: <RedditShareButton />,
    icon: <RedditIcon />,
    label: "Reddit",
  },
  {
    shareButton: <TelegramShareButton />,
    icon: <TelegramIcon />,
    label: "Telegram",
  },
  {
    shareButton: <TwitterShareButton />,
    icon: <TwitterIcon />,
    label: "Twitter",
  },
  {
    shareButton: <WhatsappShareButton />,
    icon: <WhatsappIcon />,
    label: "WhatsApp",
  },
];

const SocialIcon = ({ shareButton, icon, label }) => {
  const currentUrl = window.location.href;

  return (
    <Stack
      direction={"column"}
      spacing={1}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ cursor: "pointer" }}
    >
      {React.cloneElement(
        shareButton,
        { url: currentUrl },
        <IconButton
          sx={{
            borderRadius: "50%",
            padding: "1rem",
            backgroundColor: "#f2f2f2",
          }}
        >
          {React.cloneElement(icon, { size: 36, round: true })}
        </IconButton>
      )}
      <Typography textAlign={"center"} fontSize={"1rem"}>
        {label}
      </Typography>
    </Stack>
  );
};

const CopyLink = ({ link, onCopy, copied }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    onCopy();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        gap: "0.7rem",
        paddingLeft: "0.8rem"
      }}
    >
      <Typography fontSize={"1rem"}>
        {" "}
        {copied ? "Link Copied" : "Copy Link"}
      </Typography>

      <Box
        sx={{
          padding: "8px",
          backgroundColor: "#f2f2f2",
          borderRadius: "10px",
        }}
      >
        <Typography sx={{ flexGrow: 1 }} variant="body2" color="textSecondary">
          {link.substring(0, 38) + "...   "}
        </Typography>
      </Box>

      <IconButton onClick={handleCopy}>
        {<ContentCopyIcon sx={{ color: "#000", fontSize: "1.5rem" }} />}
      </IconButton>
    </Box>
  );
};

const SocialShare = ({ open, handleClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    setCopied(true);
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Share this property to your people
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          left: 20,
          padding: 0,
          top: 20,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Stack direction={"column"} spacing={4}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {socialShareData.map((socialData, index) => (
              <SocialIcon key={index} {...socialData} />
            ))}
          </Box>

          <CopyLink
            link={window.location.href}
            copied={copied}
            onCopy={handleCopyLink}
          />
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default SocialShare;
