
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="container max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tutor-navy mb-2">Privacy Policy</h1>
        <p className="text-tutor-gray">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">1. Information We Collect</h2>
          <p className="text-tutor-dark-gray mb-3">
            We collect personal information that you voluntarily provide to us when you register on the platform, express interest in obtaining information about us or our products, or otherwise contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">2. How We Use Your Information</h2>
          <p className="text-tutor-dark-gray mb-3">
            We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our users and ourselves. We also use this information to communicate with you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">3. How We Share Your Information</h2>
          <p className="text-tutor-dark-gray mb-3">
            We do not share your personal information with third parties except as described in this privacy policy. We may share your personal information with our service providers who process your information to provide services on our behalf.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">4. Data Security</h2>
          <p className="text-tutor-dark-gray mb-3">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">5. Your Data Protection Rights</h2>
          <p className="text-tutor-dark-gray mb-3">
            You have certain data protection rights including the right to access, correct, update, or request deletion of your personal information. You can exercise these rights by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">6. Changes to This Privacy Policy</h2>
          <p className="text-tutor-dark-gray mb-3">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-tutor-navy mb-3">7. Contact Us</h2>
          <p className="text-tutor-dark-gray mb-3">
            If you have any questions about this Privacy Policy, please contact us at privacy@aku.education.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
