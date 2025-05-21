import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CasinoIcon from '@mui/icons-material/Casino';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Sample data - replace this with your actual data fetching logic
const sampleData = [
  {
    _id: "682ca7dd607e90033a70ab71",
    nom: "Ben Abdelslem",
    prenom: "youssef",
    email: "youssef@gmail.com",
    telephone: "20212120",
    AdressePostale: "206547",
    statusActuel: "Locataire",
    autre: "",
    typeDeBienRecherche: "Maison",
    budget: "200000",
    createdAt: "2025-05-20T16:03:41.392Z",
    updatedAt: "2025-05-20T16:03:41.392Z",
  }
];

function Liste() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    participants: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });
  const [openDialog, setOpenDialog] = useState(false);

  const getStatusStyle = (statut) => ({
    backgroundColor:
      statut === "En réflexion"
        ? "#16A34A33"
        : statut === "Recherche active"
        ? "#EAB30833"
        : "transparent",
    color:
      statut === "En réflexion"
        ? "#16A34A"
        : statut === "Recherche active"
        ? "#EAB308"
        : "inherit",
  });

  const handleShow = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/participants?page=${page}&limit=${data.itemsPerPage}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:3000/api/participants/all');
      setOpenDialog(false);
      handleShow(); // Refresh the list
    } catch (error) {
      console.error('Error deleting all participants:', error);
    }
  };

  useEffect(() => {
    handleShow();
  }, []);

  const handlePageChange = (event, newPage) => {
    handleShow(newPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Liste des Participants
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CasinoIcon />}
            onClick={() => navigate('/game')}
          >
            Tirage au Sort
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Supprimer Tout
          </Button>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer tous les participants ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleDeleteAll} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      
      <TableContainer component={Paper} sx={{ boxShadow: 0, border: '1px solid #e0e0e0' }}>
        <Table sx={{ minWidth: 650 }} aria-label="participants table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Nom</TableCell>
              <TableCell sx={{ color: 'white' }}>Prénom</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Téléphone</TableCell>
              <TableCell sx={{ color: 'white' }}>Profession</TableCell>
              <TableCell sx={{ color: 'white' }}>Ville</TableCell>
              <TableCell sx={{ color: 'white' }}>Type de Bien</TableCell>
              <TableCell sx={{ color: 'white' }}>Service</TableCell>
              <TableCell sx={{ color: 'white' }}>Statut</TableCell>
              <TableCell sx={{ color: 'white' }}>Budget</TableCell>
              <TableCell sx={{ color: 'white' }}>Date d'inscription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.participants.map((participant) => (
              <TableRow
                key={participant._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{participant.nom}</TableCell>
                <TableCell>{participant.prenom}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>{participant.telephone}</TableCell>
                <TableCell>{participant.profession}</TableCell>
                <TableCell>{participant.villeResidence}</TableCell>
                <TableCell>
                  {participant.typeBienRecherche === 'Autre' 
                    ? participant.typeBienRechercheAutre 
                    : participant.typeBienRecherche}
                </TableCell>
                <TableCell>
                  {participant.typeServiceRecherche === 'Autre'
                    ? participant.typeServiceRechercheAutre
                    : participant.typeServiceRecherche}
                </TableCell>
                <TableCell>
                  <Chip
                    label={participant.statutProjet}
                    sx={getStatusStyle(participant.statutProjet)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {participant.budget === 'À définir'
                    ? participant.budgetDefini
                    : participant.budget}
                </TableCell>
                <TableCell>{formatDate(participant.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Stack spacing={2}>
          <Pagination 
            count={data.totalPages} 
            page={data.currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton 
            showLastButton
          />
          <Typography variant="body2" color="text.secondary" align="center">
            Affichage de {data.participants.length} sur {data.totalItems} entrées
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Liste;