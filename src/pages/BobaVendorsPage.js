import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import VendorCard from '../components/VendorCard';
import theme from '../theme';

import bobaTalksLogo from '../imgs/bubbleTeaLogo.png';
import jeffLogo from '../imgs/jeff.png';
import kungFuTeaLogo from '../imgs/kungFuTeaLogo.png';

export default function BobaVendorsPage() {
  const vendors = [
    {
      vendor_name: 'Jeffs Boba for the Nguyen',
      location: '123 University Ave',
      specialty: 'Homemade mom and pop shop',
      imageUrl: jeffLogo
    },
    {
      vendor_name: 'Kung Fu Tea',
      location: '456 State Street',
      specialty: 'Variety of flavors to choose from',
      imageUrl: kungFuTeaLogo
    },
    {
      vendor_name: 'Boba Talks',
      location: '789 College Ave',
      specialty: 'Popular among students',
      imageUrl: bobaTalksLogo
    },
    {
      vendor_name: 'Tiger Sugar',
      location: '321 Main Street',
      specialty: 'Famous brown sugar milk tea',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGeteftUNRQ4oxR89ifj79W6JITe_wTOPSBg&s'
    },
    {
      vendor_name: 'Yi Fang Taiwan Fruit Tea',
      location: '654 Downtown Blvd',
      specialty: 'Fresh fruit teas and traditional recipes',
      imageUrl: 'https://yifangteaon.ca/wp-content/uploads/2020/12/1%E4%B8%80%E8%8A%B3%E6%B0%B4%E6%9E%9C%E8%8C%B6yifang-fruit-tea.png'
    },
    {
      vendor_name: 'Gong Cha',
      location: '987 Tea Avenue',
      specialty: 'Premium tea and milk foam',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDr93jCLj3VQAyltgVg7_GRe0WrbumG65Aw&s'
    },
    {
      vendor_name: 'Happy Lemon',
      location: '147 Bubble Street',
      specialty: 'Rock salt cheese series',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKW5q-wtFz3bMrArNg1kAyxJq1ioW4WVVWg&s'
    },
    {
      vendor_name: 'Chatime',
      location: '258 Pearl Drive',
      specialty: 'Authentic Taiwanese bubble tea',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZLj8DPvDo9y8FQCBzrlhHpoc6BseYBBvOg&s'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="width-no-space"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 12, sm: 12 },
          pb: { xs: 12, sm: 12 },
          px: 0,
          backgroundColor: '#D3E9FF',
        }}
      >
        <Typography sx={{ fontFamily: "Poppins", padding: 2, color: '#021944', fontWeight: 'bold', textAlign: 'left' }} variant="h4" component="div">
          Local Boba Vendors Nearby
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 2,
          p: 2
        }}>
          {vendors && vendors.length > 0 ? vendors.map((vendor, index) => (
            <VendorCard event={vendor} key={index} />
          )) : (<p>No vendors found</p>)}
        </Box>
      </Container>
    </ThemeProvider>
  );
}