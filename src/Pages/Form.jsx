import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  FormLabel,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import BuildIcon from '@mui/icons-material/Build';
import TimelineIcon from '@mui/icons-material/Timeline';
import MapIcon from '@mui/icons-material/Map';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CampaignIcon from '@mui/icons-material/Campaign';
import { toast, Toaster } from 'sonner';

const typeBienOptions = [
  'Appartement',
  'Villa',
  'Terrain',
  'Local commercial',
  'Autre'
];

const typeServiceOptions = [
  'Achat d\'un bien',
  'Construction clé en main',
  'Étude de projet',
  'Réaménagement / rénovation',
  'Autre'
];

const budgetOptions = [
  '< 150.000 TND',
  '150.000 – 250.000 TND',
  '250.000 – 400.000 TND',
  '> 400.000 TND',
  'À définir'
];

const financementOptions = [
  'Comptant',
  'Crédit bancaire',
  'En cours de demande',
  'Facilité de paiement'
];

const sourceConnaissanceOptions = [
  'Réseaux sociaux',
  'Recommandation',
  'Publicité en ligne',
  'Passage sur place',
  'Autre'
];

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Form() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    profession: '',
    villeResidence: '',
    typeBienRecherche: '',
    typeBienRechercheAutre: '',
    typeServiceRecherche: [],
    typeServiceRechercheAutre: '',
    statutProjet: '',
    delaiAchat: null,
    localisationSouhaitee: '',
    budget: '',
    budgetDefini: '',
    financement: [],
    dureePaiement: '',
    montantAvance: '',
    sourceConnaissance: '',
    sourceConnaissanceAutre: ''
  });
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = { ...form };
      
      if (formData.statutProjet !== 'Recherche active') {
        formData.delaiAchat = null;
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/participants`, formData);
      setForm({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        profession: '',
        villeResidence: '',
        typeBienRecherche: '',
        typeBienRechercheAutre: '',
        typeServiceRecherche: [],
        typeServiceRechercheAutre: '',
        statutProjet: '',
        delaiAchat: null,
        localisationSouhaitee: '',
        budget: '',
        budgetDefini: '',
        financement: [],
        dureePaiement: '',
        montantAvance: '',
        sourceConnaissance: '',
        sourceConnaissanceAutre: ''
      });
      setTabValue(0);
      toast.success('Inscription réussie !');
    } catch (err) {
      if (err.response?.data?.message?.includes('E11000 duplicate key error')) {
        toast.error('Cet email est déjà inscrit. Veuillez en utiliser un autre.');
      } else {
        toast.error(err.response?.data?.message || err.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh', width: '100vw' }} > 
      <Toaster richColors />
      <Grid item xs={12} md={6}  sx={{
        width: { xs: '100%', md: '50vw' },
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: { xs: 'none', md: 'block' }
      }}>
        <img 
          src="/images/house.jpg" 
          alt="House" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            objectFit: 'contain',
            top: 0,
            left: 0
          }} 
        />
      </Grid>

      <Grid item xs={12} md={6} sx={{
        width: { xs: '100%', md: '50vw' },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'white',
        overflowY: 'auto',
    
      }}>
        <Box sx={{ width: '100%', p: { xs: 2, md: 6 }, maxWidth: 520, mx: 'auto', borderRadius: 4 ,    border: '1px solid #059ad7',}}>
          <Typography variant="h5" sx={{ color: '#059ad7', mb: 4, textAlign: 'center', fontWeight: 600, letterSpacing: 1 }}>
            Formulaire d'inscription
          </Typography>

          <Paper sx={{ width: '100%', mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            
            >
              <Tab label="Informations personnelles" />
              <Tab label="Projet immobilier" />
            </Tabs>
          </Paper>
          
          <Box component="form" onSubmit={handleSubmit}>
            <TabPanel value={tabValue} index={0}>
              <TextField
                label="Prénom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Entrez votre prénom"
                InputProps={{ startAdornment: <PersonIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />
              <TextField
                label="Nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Entrez votre nom"
                InputProps={{ startAdornment: <PersonIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />
              <TextField
                label="Téléphone"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Ex: 06 12 34 56 78"
                InputProps={{ startAdornment: <PhoneIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Ex: exemple@email.com"
                InputProps={{ startAdornment: <EmailIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />
              <TextField
                label="Profession"
                name="profession"
                value={form.profession}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Ex: Ingénieur, Médecin, etc."
                InputProps={{ startAdornment: <WorkIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />
              <TextField
                label="Ville de résidence"
                name="villeResidence"
                value={form.villeResidence}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Ex: Tunis, Sousse, etc."
                InputProps={{ startAdornment: <LocationOnIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />
              <Button
                variant="contained"
                onClick={() => setTabValue(1)}
                sx={{
                  mt: 2,
                  boxShadow: 'none',
                  bgcolor: '#059ad7',
                  '&:hover': { bgcolor: '#047bb0' }
                }}
              >
                Suivant
              </Button>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <FormControl fullWidth required>
                <InputLabel>Type de bien recherché</InputLabel>
                <Select
                  name="typeBienRecherche"
                  value={form.typeBienRecherche}
                  onChange={handleChange}
                  label="Type de bien recherché"
                  startAdornment={<HomeWorkIcon sx={{ color: '#059ad7', mr: 1 }} />}
                  placeholder="Choisissez le type de bien qui vous intéresse"
                >
                  <MenuItem value="" disabled>
                    <em>Sélectionnez le type de bien</em>
                  </MenuItem>
                  {typeBienOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {form.typeBienRecherche === 'Autre' && (
                <TextField
                  label="Précisez le type de bien"
                  name="typeBienRechercheAutre"
                  value={form.typeBienRechercheAutre}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Décrivez le type de bien que vous recherchez"
                  InputProps={{ startAdornment: <HomeWorkIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
                />
              )}

              <FormControl fullWidth required>
                <InputLabel>Type de service recherché</InputLabel>
                <Select
                  name="typeServiceRecherche"
                  value={form.typeServiceRecherche}
                  onChange={handleChange}
                  label="Type de service recherché"
                  multiple
                  startAdornment={<BuildIcon sx={{ color: '#059ad7', mr: 1 }} />}
                  placeholder="Sélectionnez les services qui correspondent à votre projet"
                >
                  {typeServiceOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {form.typeServiceRecherche.includes('Autre') && (
                <TextField
                  label="Précisez les autres services"
                  name="typeServiceRechercheAutre"
                  value={form.typeServiceRechercheAutre}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Décrivez les services spécifiques dont vous avez besoin"
                  InputProps={{ startAdornment: <BuildIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
                />
              )}

              <FormControl component="fieldset" required>
                <FormLabel component="legend">Statut du projet</FormLabel>
                <RadioGroup
                  name="statutProjet"
                  value={form.statutProjet}
                  onChange={handleChange}
                  aria-label="Statut du projet"
                  placeholder="Indiquez où vous en êtes dans votre projet"
                >
                  <FormControlLabel value="En réflexion" control={<Radio />} label="En réflexion" />
                  <FormControlLabel value="Recherche active" control={<Radio />} label="Recherche active" />
                </RadioGroup>
              </FormControl>

              {form.statutProjet === 'Recherche active' && (
                <FormControl component="fieldset" required>
                  <FormLabel component="legend">Achat prévu dans</FormLabel>
                  <RadioGroup
                    name="delaiAchat"
                    value={form.delaiAchat}
                    onChange={handleChange}
                    aria-label="Délai d'achat"
                    placeholder="Précisez votre échéance d'achat"
                  >
                    <FormControlLabel value="< 3 mois" control={<Radio />} label="< 3 mois" />
                    <FormControlLabel value="3-6 mois" control={<Radio />} label="3-6 mois" />
                    <FormControlLabel value="> 6 mois" control={<Radio />} label="> 6 mois" />
                  </RadioGroup>
                </FormControl>
              )}

              <TextField
                label="Localisation souhaitée"
                name="localisationSouhaitee"
                value={form.localisationSouhaitee}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                placeholder="Indiquez la zone géographique qui vous intéresse"
                InputProps={{ startAdornment: <MapIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
              />

              <FormControl fullWidth required>
                <InputLabel>Budget estimé</InputLabel>
                <Select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  label="Budget estimé"
                  startAdornment={<MonetizationOnIcon sx={{ color: '#059ad7', mr: 1 }} />}
                  placeholder="Sélectionnez votre fourchette de budget"
                >
                  <MenuItem value="" disabled>
                    <em>Sélectionnez votre budget</em>
                  </MenuItem>
                  {budgetOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {form.budget === 'À définir' && (
                <TextField
                  label="Budget défini"
                  name="budgetDefini"
                  value={form.budgetDefini}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Indiquez votre budget approximatif en TND"
                  InputProps={{ startAdornment: <MonetizationOnIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
                />
              )}

              <FormControl fullWidth required>
                <InputLabel>Financement</InputLabel>
                <Select
                  name="financement"
                  value={form.financement}
                  onChange={handleChange}
                  label="Financement"
                  multiple
                  startAdornment={<AccountBalanceIcon sx={{ color: '#059ad7', mr: 1 }} />}
                  placeholder="Choisissez vos modes de financement"
                >
                  {financementOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {form.financement.includes('Facilité de paiement') && (
                <Grid >
                  <Grid item xs={5} >
                    <TextField
                      label="Durée de paiement"
                      name="dureePaiement"
                      value={form.dureePaiement}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      placeholder="Ex: 12 mois, 24 mois, etc."
                      InputProps={{ startAdornment: <TimelineIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
                    />
                  </Grid>
                  <Grid item xs={5} mt={2}>
                    <TextField
                      label="Montant d'avance"
                      name="montantAvance"
                      value={form.montantAvance}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      placeholder="Ex: 250000"
                      InputProps={{ startAdornment: <MonetizationOnIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
                    />
                  </Grid>
                </Grid>
              )}

              <FormControl fullWidth required>
                <InputLabel>Comment avez-vous connu LEADERS IMMOBILIER ?</InputLabel>
                <Select
                  name="sourceConnaissance"
                  value={form.sourceConnaissance}
                  onChange={handleChange}
                  label="Comment avez-vous connu LEADERS IMMOBILIER ?"
                  startAdornment={<CampaignIcon sx={{ color: '#059ad7', mr: 1 }} />}
                  placeholder="Indiquez comment vous nous avez découvert"
                >
                  <MenuItem value="" disabled>
                    <em>Sélectionnez la source</em>
                  </MenuItem>
                  {sourceConnaissanceOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {form.sourceConnaissance === 'Autre' && (
                <TextField
                  label="Précisez la source"
                  name="sourceConnaissanceAutre"
                  value={form.sourceConnaissanceAutre}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  placeholder="Décrivez comment vous nous avez connu"
                  InputProps={{ startAdornment: <CampaignIcon sx={{ color: '#059ad7', mr: 1 }} /> }}
                />
              )}

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setTabValue(0)}
                  sx={{ flex: 1 }}
                >
                  Précédent
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    flex: 1,
                    boxShadow: "none", 
                    bgcolor: '#059ad7', 
                    borderRadius: 2, 
                    fontWeight: 600, 
                    fontSize: 18, 
                    py: 1.5, 
                    '&:hover': { bgcolor: '#047bb0' } 
                  }} 
                  disabled={loading}
                >
                  {loading ? 'Envoi...' : 'Envoyer'}
                </Button>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Form;