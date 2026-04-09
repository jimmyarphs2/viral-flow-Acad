import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-tiktok-black flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-center backdrop-blur-xl">
            <div className="w-16 h-16 bg-tiktok-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-tiktok-red" />
            </div>
            <h2 className="text-2xl font-display uppercase italic text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-white/60 font-heading text-sm mb-8">
              The application encountered an unexpected error. This might be due to a configuration issue or a temporary connection problem.
            </p>
            
            {this.state.error && (
              <div className="mb-8 p-4 bg-black/40 rounded-xl border border-white/5 text-left overflow-hidden">
                <p className="text-tiktok-cyan text-xs font-mono break-all line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <Button 
              onClick={() => window.location.reload()}
              className="w-full bg-tiktok-cyan hover:bg-tiktok-cyan/90 text-tiktok-black py-6 rounded-full font-display uppercase italic flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
