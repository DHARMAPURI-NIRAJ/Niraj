import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, MessageSquare, Clock, User, RefreshCw, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchMessages();
      
      // Subscribe to realtime changes
      const channel = supabase
        .channel('contact_messages_changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'contact_messages',
          },
          (payload) => {
            setMessages((prev) => [payload.new as ContactMessage, ...prev]);
            toast({
              title: "New message received!",
              description: `From ${(payload.new as ContactMessage).name}`,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been signed out successfully.",
    });
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Back to portfolio"
            >
              <Home className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-muted rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {messages.length > 0 ? formatDate(messages[0]?.created_at).split(',')[0] : '-'}
                </p>
                <p className="text-sm text-muted-foreground">Latest Message</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <motion.button
              onClick={fetchMessages}
              disabled={isLoading}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Messages</span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Messages List */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold mb-4">Contact Messages</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">Messages from your contact form will appear here</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-soft transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-full">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{message.name}</p>
                        <a 
                          href={`mailto:${message.email}`}
                          className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          {message.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {formatDate(message.created_at)}
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">{message.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
