import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  PhoneIcon, 
  UserIcon, 
  CalendarIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  IdentificationIcon,
  EnvelopeIcon,
  MapPinIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false to avoid initial loading
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newPatient, setNewPatient] = useState({
    name: "",
    phoneNumber: "",
    nationalId: "",
    email: "",
    dateOfBirth: "",
    address: "",
    assignedDoctor: "",
    preferredLanguage: "English",
    communicationPreference: "SMS"
  });

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format phone number for display
  const formatPhoneNumber = (phone) => {
    if (phone.startsWith('0')) {
      return `+254${phone.slice(1)}`;
    }
    return phone.startsWith('+254') ? phone : `+254${phone}`;
  };

  // Mock data for demonstration (remove when connecting to real API)
  const mockPatients = [
    {
      _id: '1',
      name: 'John Doe',
      phoneNumber: '0712345678',
      nationalId: '12345678',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-15',
      address: '123 Main St, Nairobi',
      assignedDoctor: 'doc1',
      preferredLanguage: 'English',
      communicationPreference: 'SMS',
      createdAt: new Date().toISOString(),
      medicalHistory: []
    },
    {
      _id: '2',
      name: 'Jane Smith',
      phoneNumber: '0723456789',
      nationalId: '23456789',
      email: 'jane.smith@example.com',
      dateOfBirth: '1985-06-20',
      address: '456 Oak Ave, Nairobi',
      assignedDoctor: 'doc2',
      preferredLanguage: 'Swahili',
      communicationPreference: 'Voice',
      createdAt: new Date().toISOString(),
      medicalHistory: [{ id: 1, condition: 'Hypertension' }]
    }
  ];

  const mockDoctors = [
    { _id: 'doc1', name: 'Sarah Johnson' },
    { _id: 'doc2', name: 'Michael Brown' },
    { _id: 'doc3', name: 'Emily Davis' }
  ];

  // Fetch patients from your API (simplified without localStorage)
  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, use mock data
      // Replace this with your actual API call when ready
      setTimeout(() => {
        setPatients(mockPatients);
        setLoading(false);
      }, 1000);
      
      /* 
      // Uncomment and modify this when connecting to real API
      const response = await fetch('/api/patients', {
        headers: {
          'Content-Type': 'application/json'
          // Add your auth headers here if needed
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPatients(data.patients || data);
      } else {
        console.error('Failed to fetch patients:', response.status);
        alert('Failed to load patients. Please try again.');
      }
      */
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors for assignment dropdown
  const fetchDoctors = async () => {
    try {
      // For demo purposes, use mock data
      setDoctors(mockDoctors);
      
      /* 
      // Uncomment and modify this when connecting to real API
      const response = await fetch('/api/users?role=doctor', {
        headers: {
          'Content-Type': 'application/json'
          // Add your auth headers here if needed
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDoctors(data.users || data);
      } else {
        console.error('Failed to fetch doctors');
      }
      */
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleInputChange = (field, value) => {
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // For demo purposes, just add to local state
      const newPatientData = {
        ...newPatient,
        _id: Date.now().toString(), // Generate a temporary ID
        createdAt: new Date().toISOString(),
        medicalHistory: []
      };
      
      setPatients(prev => [...prev, newPatientData]);
      setNewPatient({
        name: "",
        phoneNumber: "",
        nationalId: "",
        email: "",
        dateOfBirth: "",
        address: "",
        assignedDoctor: "",
        preferredLanguage: "English",
        communicationPreference: "SMS"
      });
      setShowForm(false);
      alert('Patient created successfully!');
      
      /* 
      // Uncomment and modify this when connecting to real API
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Add your auth headers here if needed
        },
        body: JSON.stringify(newPatient)
      });

      if (response.ok) {
        const result = await response.json();
        const savedPatient = result.patient || result;
        setPatients(prev => [...prev, savedPatient]);
        // Reset form and close dialog
        setNewPatient({...});
        setShowForm(false);
        alert('Patient created successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Error creating patient');
      }
      */
    } catch (error) {
      console.error('Error creating patient:', error);
      alert('Network error. Please try again.');
    }
  };

  // Delete patient function
  const handleDeletePatient = async (patientId) => {
    if (!confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      return;
    }

    try {
      // For demo purposes, just remove from local state
      setPatients(prev => prev.filter(patient => patient._id !== patientId));
      alert('Patient deleted successfully');
      
      /* 
      // Uncomment and modify this when connecting to real API
      const response = await fetch(`/api/patients/${patientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // Add your auth headers here if needed
        }
      });

      if (response.ok) {
        setPatients(prev => prev.filter(patient => patient._id !== patientId));
        alert('Patient deleted successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Error deleting patient');
      }
      */
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Network error. Please try again.');
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.includes(searchTerm) ||
    (patient.nationalId && patient.nationalId.includes(searchTerm))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
            <p className="text-gray-600">Manage your patient records and information</p>
          </div>
          
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="bg-teal-700 hover:bg-teal-800 text-white">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={newPatient.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={newPatient.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="0712345678 or +254712345678"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID</Label>
                    <Input
                      id="nationalId"
                      type="text"
                      value={newPatient.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      placeholder="Enter National ID"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="patient@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newPatient.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={newPatient.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter patient's address"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedDoctor">Assigned Doctor *</Label>
                  <Select 
                    value={newPatient.assignedDoctor} 
                    onValueChange={(value) => handleInputChange('assignedDoctor', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor._id} value={doctor._id}>
                          Dr. {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select 
                      value={newPatient.preferredLanguage} 
                      onValueChange={(value) => handleInputChange('preferredLanguage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Swahili">Swahili</SelectItem>
                        <SelectItem value="Kikuyu">Kikuyu</SelectItem>
                        <SelectItem value="Luo">Luo</SelectItem>
                        <SelectItem value="Luhya">Luhya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="communication">Communication Preference</Label>
                    <Select 
                      value={newPatient.communicationPreference} 
                      onValueChange={(value) => handleInputChange('communicationPreference', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SMS">SMS</SelectItem>
                        <SelectItem value="Voice">Voice Call</SelectItem>
                        <SelectItem value="USSD">USSD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="bg-teal-700 hover:bg-teal-800 flex-1">
                    Save Patient
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by name, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {patient.name}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className={`${
                    patient.communicationPreference === 'SMS' ? 'bg-blue-100 text-blue-800' :
                    patient.communicationPreference === 'Voice' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}
                >
                  {patient.communicationPreference}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center text-gray-600">
                <UserIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Age: {calculateAge(patient.dateOfBirth)} years
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <PhoneIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">{formatPhoneNumber(patient.phoneNumber)}</span>
              </div>

              {patient.nationalId && (
                <div className="flex items-center text-gray-600">
                  <IdentificationIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">ID: {patient.nationalId}</span>
                </div>
              )}

              {patient.email && (
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{patient.email}</span>
                </div>
              )}

              {patient.address && (
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm line-clamp-2">{patient.address}</span>
                </div>
              )}

              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Registered: {new Date(patient.createdAt).toLocaleDateString()}
                </span>
              </div>

              {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                <div className="flex items-center text-gray-600">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {patient.medicalHistory.length} medical record(s)
                  </span>
                </div>
              )}
              
              <div className="pt-3 border-t flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeletePatient(patient._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && !loading && (
        <div className="text-center py-12">
          <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first patient"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Patients;