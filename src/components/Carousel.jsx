import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';
import { keyframes } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const Carousel = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://18.135.100.58/api/home/base/');
        const data = await response.json();
        const cityNames = data.results.map(item => item.placeholder_name);
        setTexts(cityNames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          width: `${texts.length * 300}px`, // Adjust width based on number of texts and box width
          height: '80px',
          animation: `${scrollAnimation} 20s linear infinite`,
        }}
      >
        {texts.concat(texts).map((text, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              position: 'relative',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              backgroundColor: '#f5f7ff',
              border: '1px solid #e0e0e0',
              marginRight: '16px',
              flexShrink: 0,
              width: '300px', // Increase box width
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-12px',
                left: '16px',
                width: '24px',
                height: '24px',
                backgroundColor: '#f5f7ff',
                border: '1px solid #e0e0e0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LocationOnIcon sx={{ fontSize: '16px', color: 'navyblue' }} />
            </Box>
            <Box sx={{ paddingLeft: '32px' }}>
              <Typography variant="body1" sx={{ color: 'navyblue' }}>
                {text}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Carousel;
