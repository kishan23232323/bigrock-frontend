 import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { applyForAgent } from '../services/Agent/agentapi';
import { useNavigate } from 'react-router-dom';
 
 function Agent() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    dob: '',
    socialId: '',
  });
  const [addressProof, setAddressProof] = useState(null);
  const [identityProof, setIdentityProof] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'addressProof') {
      setAddressProof(files[0]);
    } else if (name === 'identityProof') {
      setIdentityProof(files[0]);
    }
  };

  const[loading, setLoading]= useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!addressProof || !identityProof) {
    toast.error("Please upload both address and identity proof");
    return;
  }
  try {
    setLoading(true);
    await applyForAgent({
      phoneNumber: formData.phoneNumber,
      dob: formData.dob,
      socialId: formData.socialId,
      addressProof,
      identityProof,
    })
    toast.success('Agent application submitted successfully!');
    setFormData({
      phoneNumber: "",
      dob: "",
      socialId: "",
    });
    setAddressProof(null);
    setIdentityProof(null);
    Navigate('/profile');

  } catch (error) {
    toast.error(error.message || 'Failed to submit agent application');
    return;
  } finally {
    setLoading(false);  
  }

  };

  return (
    <div className="flex p-6 items-center justify-center min-h-screen" style={{ background: '#08111B' }}>
      <div className="w-full max-w-lg bg-transparent backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-slate-300 mb-8">
          Become a P2P Agent
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Full Name</label>
            <input type="text" name="name" value={user.name.toUpperCase()} disabled onChange={handleChange} required className="mt-1 w-full text-slate-200 bg-gray-800/50 px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500" placeholder="Enter your full name" />
          </div>

          {/* phoneNumber */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="mt-1 w-full text-slate-200 bg-gray-800/50 px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500" placeholder="Enter your Phone number" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Email Address</label>
            <input type="email" name="email" value={user.email} disabled onChange={handleChange} required className="mt-1 w-full text-slate-200 bg-gray-800/50 px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500" placeholder="Enter your email" />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="mt-1 w-full text-slate-200 bg-gray-800/50 px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500" />
          </div>

          {/* Telegram/Social ID */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Telegram / Social ID</label>
            <input type="text" name="socialId" value={formData.socialId} onChange={handleChange} required className="mt-1 w-full text-slate-200 bg-gray-800/50 px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500" placeholder="Enter your Telegram or other social ID" />
          </div>

          {/* Proof of Address */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Proof of Address (Bank Account Statement)</label>
            <input type="file" name="addressProof" onChange={handleFileChange} required accept="image/*,.pdf" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" />
             {addressProof && <p className="text-xs text-gray-400 mt-1">File: {addressProof.name}</p>}
          </div>

          {/* Proof of Identity */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Proof of Identity (Driving License/Passport)</label>
            <input type="file" name="identityProof" onChange={handleFileChange} required accept="image/*,.pdf" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" />
            {identityProof && <p className="text-xs text-gray-400 mt-1">File: {identityProof.name}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #06eef5, #00ffa3)",
              boxShadow: "0 0 20px rgba(6, 238, 245, 0.4)",
            }}
            className="w-full text-black font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02] mt-4"
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 30px rgba(6, 238, 245, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 0 20px rgba(6, 238, 245, 0.4)";
            }}
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
 }
 

 export default Agent;