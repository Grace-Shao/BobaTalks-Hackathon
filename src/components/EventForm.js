import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from '@mui/lab/DatePicker';

const CreateEventForm = ({ initialFormValues, currentUserEmail }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  
  const allOrganizerEmails = [
    'a@gmail.com',
    'alexander.shen@gmail.com',
    'b@gmail.com',
    'c@gmail.com'
  ]

  const handleChange = (field) => (event, value) => {
    if (field === 'startDate' || field === 'endDate') {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    } else if (field === 'organizers') {
      setFormValues((prev) => ({ ...prev, organizers: value }));
    } else {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    }

    // Clear specific field error when user starts typing/selecting
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setSubmitError('');
    setSubmitSuccess('');
  };

  const validate = () => {
    const newErrors = {};

    // Required Fields: currentMoney, goalAmount, eventName, organizers, startDate, endDate
    if (!formValues.currentMoney) {
      newErrors.currentMoney = 'Current money is required';
    } else if (Number(formValues.currentMoney) < 0) {
      newErrors.currentMoney = 'Current money cannot be negative';
    }

    if (!formValues.goalAmount) {
      newErrors.goalAmount = 'Goal amount is required';
    } else if (Number(formValues.goalAmount) <= 0) {
      newErrors.goalAmount = 'Goal amount must be greater than zero';
    }

    if (!formValues.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }

    if (!formValues.organizers || formValues.organizers.length === 0) {
      newErrors.organizers = 'At least one organizer is required';
    } else {
      // Check if current user's email is included
      if (!formValues.organizers.includes(currentUserEmail)) {
        newErrors.organizers = 'Organizers must include your email';
      }

      // Check for unique emails
      const uniqueOrganizers = new Set(formValues.organizers);
      if (uniqueOrganizers.size !== formValues.organizers.length) {
        newErrors.organizers = 'Organizer emails must be unique';
      }
    }

    if (!formValues.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formValues.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formValues.startDate && formValues.endDate) {
      if (formValues.endDate < formValues.startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (validate()) {
      // Handle form submission logic here
      console.log('Form Submitted:', formValues);

      // Simulate successful submission
      setSubmitSuccess('Donation event created successfully!');

      // Clear errors
      setErrors({});
    } else {
      setSubmitError('Please fix the errors above and try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      noValidate
    >
      <Typography variant="h5" align="center" gutterBottom>
          Create Donation Event
        </Typography>
        <Grid container spacing={2}>
          {/* Event Name */}
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              variant="outlined"
              fullWidth
              required
              value={formValues.eventName}
              onChange={handleChange('eventName')}
              error={Boolean(errors.eventName)}
              helperText={errors.eventName}
            />
          </Grid>

          {/* Current Money and Goal Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Money"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={formValues.currentMoney}
              onChange={handleChange('currentMoney')}
              inputProps={{ min: 0 }}
              error={Boolean(errors.currentMoney)}
              helperText={errors.currentMoney}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Goal Amount"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={formValues.goalAmount}
              onChange={handleChange('goalAmount')}
              inputProps={{ min: 0 }}
              error={Boolean(errors.goalAmount)}
              helperText={errors.goalAmount}
            />
          </Grid>

          {/* Organizers */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={allOrganizerEmails}
              getOptionLabel={(option) => option}
              value={formValues.organizers}
              onChange={handleChange('organizers')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Organizers"
                  placeholder="Select organizers"
                  required
                  error={Boolean(errors.organizers)}
                  helperText={errors.organizers}
                />
              )}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={formValues.description}
              onChange={handleChange('description')}
            />
          </Grid>

          {/* Start and End Dates */}
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={formValues.startDate}
              onChange={handleChange('startDate')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(errors.startDate)}
                  helperText={errors.startDate}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={formValues.endDate}
              onChange={handleChange('endDate')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(errors.endDate)}
                  helperText={errors.endDate}
                />
              )}
            />
          </Grid>

          {/* Image URL */}
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              variant="outlined"
              type="url"
              fullWidth
              value={formValues.imageUrl}
              onChange={handleChange('imageUrl')}
              error={Boolean(errors.imageUrl)}
              helperText={errors.imageUrl}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </Box>
  );
}

export default CreateEventForm;