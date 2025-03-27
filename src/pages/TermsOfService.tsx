
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="container max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tutor-navy mb-2">Terms of Service</h1>
        <p className="text-tutor-gray">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">1. Introduction</h2>
          <p className="text-tutor-dark-gray mb-3">
            Welcome to EduNova. By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">2. Educational Content</h2>
          <p className="text-tutor-dark-gray mb-3">
            Our platform provides educational content aligned with the Ethiopian curriculum. While we strive for accuracy, we make no warranties regarding the completeness or reliability of the content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">3. User Accounts</h2>
          <p className="text-tutor-dark-gray mb-3">
            Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must notify us immediately of any unauthorized use of their account or any other breach of security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">4. AI Tutor Usage</h2>
          <p className="text-tutor-dark-gray mb-3">
            Our AI Tutor is provided to enhance learning experiences. Users should not rely solely on AI-generated content for academic submissions. The AI tutor responses should be verified with official curriculum materials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">5. Intellectual Property</h2>
          <p className="text-tutor-dark-gray mb-3">
            The content, features, and functionality of our platform are owned by EduNova and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">6. Privacy</h2>
          <p className="text-tutor-dark-gray mb-3">
            Your use of EduNova is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">7. Limitation of Liability</h2>
          <p className="text-tutor-dark-gray mb-3">
            EduNova shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the platform or any content provided.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">8. Changes to Terms</h2>
          <p className="text-tutor-dark-gray mb-3">
            We reserve the right to modify these terms at any time. We will provide notice of any significant changes through the platform or via email. Your continued use of the platform after such modifications constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">9. Contact Information</h2>
          <p className="text-tutor-dark-gray mb-3">
            If you have any questions about these Terms of Service, please contact us at support@edunova.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
