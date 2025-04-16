
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthForm from '@/components/AuthForm';

const AuthSection = () => {
  return (
    <div className="w-full lg:w-1/2">
      <Card className="backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-tutor-navy">
            Log in to start learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthSection;
