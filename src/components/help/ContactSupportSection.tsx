
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ContactSupportSection = () => {
  return (
    <div className="bg-tutor-beige/30 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-tutor-navy mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-tutor-orange" />
        Contact Support
      </h2>
      <p className="text-tutor-dark-gray mb-4">
        Can't find what you're looking for? Our support team is here to help.
      </p>
      <Button asChild>
        <Link to="/contact">
          Contact Support
        </Link>
      </Button>
    </div>
  );
};
