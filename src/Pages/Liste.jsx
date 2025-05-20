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

const [sampleData, setSampleData] = useState([]);


  const handleShow = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/participants');
        setSampleData(response.data);
    } catch (error) {
        console.log(error);
}
}

useEffect(() => {
  handleShow();
}, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Liste des Utilisateurs
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
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
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((user) => (
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
                    color={user.statusActuel === "Locataire" ? "success" : "primary"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.typeDeBienRecherche}</TableCell>
                <TableCell>{user.budget}</TableCell>
                <TableCell>{user.createdAt.split('T')[0]}</TableCell>
                <TableCell>
                  <Tooltip title="Modifier">
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Liste;