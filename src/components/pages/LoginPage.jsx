import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const LoginPage = () => {
  const navigate = useNavigate();

// Redirect to the new authentication system
  React.useEffect(() => {
    navigate('/login');
  }, [navigate]);

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-center p-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Zap" className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-800 mb-2">
            Redirecting to Login
          </h1>
          <p className="text-slate-600 mb-4">
            Please wait while we redirect you to the new authentication system...
          </p>
          <div className="animate-spin mx-auto w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;