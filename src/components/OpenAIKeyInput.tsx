
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OpenAIService } from '@/services/openaiService';

const OpenAIKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const existingKey = localStorage.getItem('OPENAI_KEY');
    if (existingKey) {
      setHasKey(true);
      setApiKey('sk-' + '*'.repeat(40)); // Show masked key
    }
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;

    setIsTestingKey(true);
    
    // Save key temporarily to test it
    localStorage.setItem('OPENAI_KEY', apiKey);
    
    try {
      const isKeyValid = await OpenAIService.testApiKey();
      setIsValid(isKeyValid);
      
      if (isKeyValid) {
        setHasKey(true);
        setApiKey('sk-' + '*'.repeat(40)); // Mask the key
      } else {
        localStorage.removeItem('OPENAI_KEY');
        alert('Invalid OpenAI API key. Please check and try again.');
      }
    } catch (error) {
      localStorage.removeItem('OPENAI_KEY');
      alert('Failed to validate API key. Please try again.');
    }
    
    setIsTestingKey(false);
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('OPENAI_KEY');
    setApiKey('');
    setHasKey(false);
    setIsValid(false);
  };

  const handleEditKey = () => {
    setHasKey(false);
    setApiKey('');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>OpenAI Integration</CardTitle>
        <CardDescription>
          Add your OpenAI API key to enable GPT-4 powered responses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasKey ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleSaveKey} 
              disabled={!apiKey.trim() || isTestingKey}
              className="w-full"
            >
              {isTestingKey ? 'Testing Key...' : 'Save & Test Key'}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">
                ✅ OpenAI API key is configured and working
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEditKey} className="flex-1">
                Update Key
              </Button>
              <Button variant="destructive" onClick={handleRemoveKey} className="flex-1">
                Remove Key
              </Button>
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p>Your API key is stored locally and never shared.</p>
          <p>Without a key, the app uses simulated responses.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenAIKeyInput;
