import React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function FaqSection() {
  const faqs = [
    {
      question: 'What is VibeZone?',
      answer: 'VibeZone is an innovative social platform designed to make digital interactions more personal and meaningful. Users can connect with others for language exchange, professional networking, or simply to make new friends.',
    },
    {
      question: 'How does VibeZone work?',
      answer: 'Once you sign up, you can customize your interests and preferences. Our smart matching system will suggest conversation partners who share your interests, goals, or language learning pursuits.',
    },
    {
        question:'Is VibeZone free to use?',
        answer:'VibeZone offers a free tier with limited calls and features, as well as premium plans that unlock additional functionality and unlimited connections.'
    },
    {
        question:'How do I earn badges on VibeZone?',
        answer:'Badges are earned through active participation, community engagement, achieving certain milestones, or adding value to the community through helpful interactions.'
    },
    {
        question:'Can I use VibeZone for professional networking?',
        answer:'Absolutely. VibeZone has a diverse community that includes professionals from various industries. You can filter connections to network in a professional context.',
    },
    {
        question:'What makes VibeZone different from other social platforms?',
        answer:'VibeZone focuses on quality interactions. designed to avoid spam and meaningless conversations, emphasizing genuine connections and continuous learning.',
    },
    {
        question:'How does VibeZone ensure my privacy and safety?',
        answer:'We prioritize your privacy with end-to-end encryption for conversations and strict data protection policies. Our community guidelines and reporting features help maintain a safe environment for all users.',
    },
    {
        question:'Can I use VibeZone to practice languages?',
        answer:'Yes, VibeZone is perfect for language learners. You can practice with native speakers and participate in language exchange sessions.'
    },
    {
        question:'What kind of metrics does VibeZone track?',
        answer:'VibeZone tracks interaction quality, conversation lengths, user feedback, and other engagement metrics to ensure a satisfying user experience.',
    },
    {
        question:'How can I get help if I have an issue on VibeZone?',
        answer:'Our support team is available 24/7. You can contact us through the app or our website for any assistance or to report a problem.',
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontSize: "30px",
            color: "#2b2b2b",
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign:"center",
            "@media (max-width:426px)": {
              fontSize:"24px",
              marginTop:"24px"
            },
          }}
        >
          Faq
        </Typography>
        <Box
          sx={{
            width: 600,
            "@media (max-width:426px)": {
              width: "100%",
            },
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={
                  <ArrowDropDownIcon
                    sx={{ fontWeight: "bold", color: "black" }}
                  />
                }
                aria-controls="panel1a-content"
                id={`panel1a-header-${index}`}
              >
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "13px",
                    color: "#2b2b2b",
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "13px",
                    color: "#2b2b2b",
                    fontFamily: "Poppins, Arial",
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
