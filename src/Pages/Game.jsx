import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Fade,
  Zoom,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import CasinoIcon from '@mui/icons-material/Casino';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Wheel } from 'react-custom-roulette';

function Game() {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [today, setToday] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchParticipants();
  }, []);

  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  const fetchParticipants = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/participants/game/today');
      setParticipants(response.data.participants);
      setToday(response.data.date);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching participants:', error);
      setIsLoading(false);
    }
  };

  const handleSpinClick = () => {
    if (!participants || participants.length === 0) {
      alert('Aucun participant disponible pour aujourd\'hui');
      return;
    }
    
    const newPrizeNumber = Math.floor(Math.random() * participants.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    if (participants && participants[prizeNumber]) {
      const selectedWinner = participants[prizeNumber];
      setWinner(selectedWinner);
    }
  };

  const getRandomColor = (index) => {
    const colors = [
      '#FFB3BA',
      '#FFDFBA',
      '#FFFFBA', 
      '#BAFFC9',
      '#BAE1FF',
      '#D5BAFF',
      '#FFCCE5',
      '#C0F0E8',
      '#F2C1F0',
      '#C2F0C2'
    ];
    return colors[index % colors.length];
  };

  const wheelData = participants.map((participant, index) => ({
    option: `${participant.prenom} ${participant.nom}`,
    style: { backgroundColor: getRandomColor(index), textColor: '#2C3E50' }
  }));

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f5f5f5',
        }}>
          <CircularProgress 
            size={60} 
            sx={{ 
              color: '#667eea',
              '& .MuiCircularProgress-circle': {
                strokeWidth: 3,
              }
            }} 
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/liste')}
          sx={{
            alignSelf: 'flex-start',
            mb: 4,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
            },
          }}
        >
          Retour
        </Button>

        <Fade in={true} timeout={1000}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Tirage au Sort
          </Typography>
        </Fade>

        {/* <Typography 
          variant="h6" 
          sx={{ 
            mb: 4,
            color: 'text.secondary',
            textAlign: 'center'
          }}
        >
          {new Date(today).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </Typography> */}
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 6,
            width: '100%',
            maxWidth: 800,
            borderRadius: 4,
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'none',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }}
        >
          {!winner && wheelData.length > 0 && (
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                Nombre de participants aujourd'hui: {participants.length}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mb: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  background: '#667eea',
                  borderRadius: '50%',
                  zIndex: 1,
                }
              }}>
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={wheelData}
                  onStopSpinning={handleStopSpinning}
                  backgroundColors={['#3e3e3e', '#df3428']}
                  textColors={['#ffffff']}
                  outerBorderColor="#667eea"
                  outerBorderWidth={3}
                  innerBorderColor="#667eea"
                  innerBorderWidth={2}
                  innerRadius={0}
                  radiusLineColor="#667eea"
                  radiusLineWidth={2}
                  fontSize={16}
                  perpendicularText={false}
                  textDistance={80} 
                  
                />
              </Box>
              
              <Button
                variant="contained"
                size="large"
                onClick={handleSpinClick}
                startIcon={<CasinoIcon />}
                disabled={mustSpin}
                sx={{
                  fontSize: '1.2rem',
                  py: 2,
                  px: 6,
                  borderRadius: 3,
           
                }}
              >
                {mustSpin ? 'En cours...' : 'Lancer la Roue'}
              </Button>
            </Box>
          )}

          {winner && (
            <Zoom in={true}>
              <Box sx={{ 
                mt: 2,
                textAlign: 'center',
                animation: 'winner-appear 0.5s ease-out'
              }}>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    mb: 3,
                  }}
                >
                  🎉 Félicitations ! 🎉
                </Typography>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    mb: 4,
                    background: 'white',
                    borderRadius: 3,
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      my: 2,
                      fontWeight: 'bold',
                      color: 'primary.main',
                    }}
                  >
                    {winner.prenom} {winner.nom}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: '#666',
                      fontWeight: 500
                    }}
                  >
                    {winner.email}
                  </Typography>
                </Paper>
                <Button
                  variant="contained"
                  onClick={() => setWinner(null)}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 'none',
                  }}
                >
                  Nouveau Tirage
                </Button>
              </Box>
            </Zoom>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Game; 