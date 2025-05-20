import React, { useState } from 'react'; 
import axios from 'axios'; 
import { Box, Grid, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { toast, Toaster } from 'sonner';

const professions = [
  'Coiffeur',
  'Esthéticien',
  'Barbier',
  'Autre',
];
const activities = [
  'Salon',
  'Institut',
  'Spa',
  'Autre',
];

const statusOptions = [
  'Propriétaire',
  'Locataire',
  'Acheteur',
  'Locataire potentiel',
  'Autre',
];
const typeBienOptions = [
  'Appartement',
  'Maison',
  'Terrain',
  'Autre',
];

function Form() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    AdressePostale: '',
    statusActuel: '',
    autre: '',
    typeDeBienRecherche: '',
    budget: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/participants', form);
      setForm({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        AdressePostale: '',
        statusActuel: '',
        autre: '',
        typeDeBienRecherche: '',
        budget: '',
      });
      toast.success('Inscription réussie !');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh', width: '100vw' }}>
        <Toaster richColors  />
      {/* Left Side - Image and Event Info */}
      <Grid item xs={12} md={6} sx={{
        width: { xs: '100%', md: '50vw' },
        minHeight: '100vh',
        backgroundImage: 'url(/images/house.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: 4,
      }}>
        {/* <Box sx={{ textAlign: 'center', zIndex: 2 }}>
          <img src="/images/house.png" alt="Wakeup Logo" style={{ width: 120, marginBottom: 32, filter: 'drop-shadow(0 0 10px #000)' }} />
          <Typography variant="subtitle2" sx={{ letterSpacing: 2, mb: 2 }}>
            NOUS SOMMES RAVIS DE VOUS INVITER À
          </Typography>
          <Typography variant="h5" sx={{ color: '#059ad7', mb: 1 }}>
            L'événement
          </Typography>
          <Typography variant="h2" sx={{ color: '#059ad7', fontStyle: 'italic', mb: 2, fontWeight: 400 }}>
            Wake Up
          </Typography>

       
        </Box> */}
        {/* Overlay for dark effect */}
      </Grid>

      {/* Right Side - Form */}
      <Grid item xs={12} md={6} sx={{
        width: { xs: '100%', md: '50vw' },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'white',
      }}>
        <Box sx={{ width: '100%', p: { xs: 2, md: 6 }, maxWidth: 520, mx: 'auto', borderRadius: 4 }}>
          <Typography variant="h5" sx={{ color: '#059ad7', mb: 3, textAlign: 'center', fontWeight: 600, letterSpacing: 1 }}>
            Veuillez remplir vos informations
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Prénom"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Entrez votre prénom"
              InputProps={{ startAdornment: <PersonIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
            />
            <TextField
              label="Nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Entrez votre nom"
              InputProps={{ startAdornment: <PersonIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
            />
            <TextField
              label="Votre email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="exemple@email.com"
              InputProps={{ startAdornment: <EmailIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
            />
            <TextField
              label="Votre téléphone"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="06 12 34 56 78"
              InputProps={{ startAdornment: <PhoneIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
            />
            <TextField
              label="Adresse postale"
              name="AdressePostale"
              value={form.AdressePostale}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="123 rue de l'exemple, 75000 Paris"
              InputProps={{ startAdornment: <LocationOnIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
            />
           <FormControl fullWidth variant="outlined" sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}>
  <InputLabel shrink sx={{ color: '#059ad7' }}>
    Status actuel
  </InputLabel>
  <Select
    label="Status actuel"
    name="statusActuel"
    value={form.statusActuel}
    onChange={handleChange}
    displayEmpty
  >
    <MenuItem value="" disabled>
      <em>Sélectionnez votre statut actuel</em>
    </MenuItem>
    {statusOptions.map((option) => (
      <MenuItem key={option} value={option}>{option}</MenuItem>
    ))}
  </Select>
</FormControl>

            {form.statusActuel === 'Autre' && (
              <TextField
                label="Précisez votre statut"
                name="autre"
                value={form.autre}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                placeholder="Précisez votre statut actuel"
                sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
              />
            )}
            <FormControl fullWidth variant="outlined" sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}>
              <InputLabel sx={{ color: '#059ad7' }}>Type de bien recherché</InputLabel>
              <Select
                label="Type de bien recherché"
                name="typeDeBienRecherche"
                value={form.typeDeBienRecherche}
                onChange={handleChange}
                startAdornment={<HomeWorkIcon sx={{ color: '#059ad7', mr: 1 }} />}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <em>Sélectionnez le type de bien recherché</em>
                </MenuItem>
                {typeBienOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Budget (optionnel)"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Ex: 250 000 TND"
              InputProps={{ startAdornment: <MonetizationOnIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              sx={{ bgcolor: '#f8fafc', borderRadius: 2 }}
            />
            <Button type="submit" variant="contained" size="large" sx={{boxShadow: "none", bgcolor: '#059ad7', mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 18, py: 1.5, '&:hover': { bgcolor: '#047bb0' } }} disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Form;