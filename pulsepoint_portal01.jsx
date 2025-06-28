import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Fingerprint, ShieldCheck, UserCircle, Syringe, PhoneCall, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockPatientData = {
  id: "A123456789",
  name: "Jane Doe",
  age: 45,
  gender: "Female",
  allergies: "Penicillin",
  conditions: "Diabetes, Hypertension",
  medications: "Metformin, Lisinopril",
  emergencyContact: "John Doe - (555) 123-4567",
  lastVisit: "March 18, 2025 - Mercy General Hospital",
  history: [
    { date: "2025-01-05", treatment: "Routine checkup", medication: "Metformin", doctor: "Dr. Lee", hospital: "Mercy General" },
    { date: "2024-11-12", treatment: "Flu symptoms", medication: "Tamiflu", doctor: "Dr. Smith", hospital: "St. Mary’s" }
  ]
};

export default function PulsePointDashboard() {
  const [patient, setPatient] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [biometricOpen, setBiometricOpen] = useState(false);
  const [tab, setTab] = useState("summary");
  const [newHistory, setNewHistory] = useState({ date: "", treatment: "", medication: "", doctor: "", hospital: "" });
  const [newPersonalInfo, setNewPersonalInfo] = useState({ name: "", age: "", gender: "" });
  const [newMedicalInfo, setNewMedicalInfo] = useState({ allergies: "", conditions: "" });

  const fetchPatientData = () => {
    if (inputValue.trim() !== "") {
      setBiometricOpen(true);
      setTimeout(() => {
        setBiometricOpen(false);
        setPatient(mockPatientData);
      }, 2000);
    }
  };

  const handleHistoryChange = (e) => {
    const { name, value } = e.target;
    setNewHistory(prev => ({ ...prev, [name]: value }));
  };

  const addHistoryEntry = () => {
    if (newHistory.date && newHistory.treatment) {
      setPatient(prev => ({ ...prev, history: [newHistory, ...prev.history] }));
      setNewHistory({ date: "", treatment: "", medication: "", doctor: "", hospital: "" });
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setNewPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicalInfoChange = (e) => {
    const { name, value } = e.target;
    setNewMedicalInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">PulsePoint</h1>
        <p className="text-gray-600 mt-2">Secure EMT Medical Access Portal</p>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter patient ID, driver's license, or scan biometric..."
          />
          <Button onClick={fetchPatientData} className="mt-2">Access Patient</Button>
        </div>

        {patient && (
          <Tabs value={tab} onValueChange={setTab} className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="history">Medical History</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <Card>
                <CardContent className="space-y-6 p-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2"><UserCircle className="text-blue-700" /> Patient Summary</h2>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2"><ShieldCheck className="text-blue-500" /> Personal Details</h3>
                    <p><strong>ID:</strong> {patient.id}</p>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Input name="name" value={newPersonalInfo.name} onChange={handlePersonalInfoChange} placeholder="Update name" />
                      <Input name="age" value={newPersonalInfo.age} onChange={handlePersonalInfoChange} placeholder="Update age" />
                      <Input name="gender" value={newPersonalInfo.gender} onChange={handlePersonalInfoChange} placeholder="Update gender" />
                    </div>
                    <Button size="sm" className="mt-2" icon={<PlusCircle className="mr-1 h-4 w-4" />}>Add Info</Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2"><Syringe className="text-blue-500" /> Medical Information</h3>
                    <p><strong>Allergies:</strong> {patient.allergies}</p>
                    <p><strong>Conditions:</strong> {patient.conditions}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input name="allergies" value={newMedicalInfo.allergies} onChange={handleMedicalInfoChange} placeholder="Update allergies" />
                      <Input name="conditions" value={newMedicalInfo.conditions} onChange={handleMedicalInfoChange} placeholder="Update conditions" />
                    </div>
                    <Button size="sm" className="mt-2" icon={<PlusCircle className="mr-1 h-4 w-4" />}>Add Info</Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2"><Syringe className="text-blue-500" /> Current Medications</h3>
                    <p><strong>Medications:</strong> {patient.medications}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2"><PhoneCall className="text-blue-500" /> Emergency Contact</h3>
                    <p>{patient.emergencyContact}</p>
                    <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-700" /> Medical History</h2>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Input name="date" placeholder="Date" value={newHistory.date} onChange={handleHistoryChange} />
                    <Input name="treatment" placeholder="Treatment" value={newHistory.treatment} onChange={handleHistoryChange} />
                    <Input name="medication" placeholder="Medication" value={newHistory.medication} onChange={handleHistoryChange} />
                    <Input name="doctor" placeholder="Doctor" value={newHistory.doctor} onChange={handleHistoryChange} />
                    <Input name="hospital" placeholder="Hospital" value={newHistory.hospital} onChange={handleHistoryChange} />
                    <div className="col-span-2">
                      <Button onClick={addHistoryEntry} icon={<PlusCircle className="mr-1 h-4 w-4" />}>Add Medical History Entry</Button>
                    </div>
                  </div>
                  {patient.history.map((entry, idx) => (
                    <div key={idx} className="mb-4 border-b pb-3">
                      <p><strong>Date:</strong> {entry.date}</p>
                      <p><strong>Treatment:</strong> {entry.treatment}</p>
                      <p><strong>Medication:</strong> {entry.medication}</p>
                      <p><strong>Doctor:</strong> {entry.doctor}</p>
                      <p><strong>Hospital:</strong> {entry.hospital}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Dialog open={biometricOpen}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>Biometric Scan in Progress...</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm text-gray-600">
            Please hold your finger on the scanner.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
