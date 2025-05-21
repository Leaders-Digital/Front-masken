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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

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
  const [data, setData] = useState({
    participants: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  const getStatusStyle = (statut) => ({
    backgroundColor:
      statut === "Propriétaire"
        ? "#16A34A33"
        : statut === "Locataire"
        ? "#EAB30833"
        : statut === "Acheteur"
        ? "#EB322333"
        : statut === "Locataire potentiel"
        ? "#33BFFF33"
        : statut === "Autre"
        ? "#16A34A33"
        : "transparent",
    color:
      statut === "Propriétaire"
        ? "#16A34A"
        : statut === "Locataire"
        ? "#EAB308"
        : statut === "Acheteur"
        ? "#EB3223"
        : statut === "Locataire potentiel"
        ? "#33BFFF"
        : statut === "Autre"
        ? "#16A34A"
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

  useEffect(() => {
    handleShow();
  }, []);

  const handlePageChange = (event, newPage) => {
    handleShow(newPage);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3,color: 'primary.main' }}>
        Liste des Utilisateurs
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 0, border: '1px solid #e0e0e0' }}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Nom</TableCell>
              <TableCell sx={{ color: 'white' }}>Prénom</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Téléphone</TableCell>
              <TableCell sx={{ color: 'white' }}>Statut</TableCell>
              <TableCell sx={{ color: 'white' }}>Type de Bien</TableCell>
              <TableCell sx={{ color: 'white' }}>Budget</TableCell>
              <TableCell sx={{ color: 'white' }}>Date de création</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.participants.map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.nom}</TableCell>
                <TableCell>{user.prenom}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>
                  <Chip
                    label={user.statusActuel}
                    sx={getStatusStyle(user.statusActuel)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.typeDeBienRecherche}</TableCell>
                <TableCell>{user.budget}</TableCell>
                <TableCell>{user.createdAt.split('T')[0]}</TableCell>
           
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