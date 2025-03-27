
import { Link } from 'react-router-dom';
import { User, LogOut, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from '../UserAvatar';

interface UserMenuProps {
  user: any;
  signOut: () => void;
}

const UserMenu = ({ user, signOut }: UserMenuProps) => {
  if (!user) {
    return (
      <Link to="/login" className="flex items-center gap-2 text-tutor-dark-gray hover:text-tutor-orange transition-colors">
        <LogIn className="h-4 w-4" />
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <UserAvatar showName={true} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            <span>My Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600">
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
