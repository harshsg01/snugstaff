import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.paper}`,
  borderRadius: "30px",
  marginBlock: `2rem`,
  textAlign: "left",
  transition: "all 0.3s ease-in-out",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  transition: "all 0.3s ease-in",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  borderRadius: "0 0 30px 30px",
  backgroundColor: theme.palette.secondary.paper,
  marginTop: theme.spacing(2),
  transition: "margin-top 0.3s",
}));

const FAQs = ({ data }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    paddingBlock: "8vh",
    paddingInline: "4vw",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.main,
  }));

  return (
    <StyledBox>
      <Container>
        {/* Headings */}
        <Typography
          variant="h1"
          fontSize={"3rem"}
          textAlign="center"
          marginBottom={{ xs: "2rem", md: "0.5rem" }}
        >
          {data.headline}
        </Typography>

        <Typography variant="subtitle1" paragraph>
          {data.subHeadline}
        </Typography>

        {/* FAQ Accordion */}
        <Box sx={{ marginTop: "3rem" }}>
          {data.faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              {/* Question */}
              <AccordionSummary
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>

              {/* Answer */}
              <AccordionDetails
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "#fff",
                  paddingInline: "2.5rem",
                }}
              >
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </StyledBox>
  );
};

export default FAQs;
