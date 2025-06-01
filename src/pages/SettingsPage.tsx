
import OpenAIKeyInput from '@/components/OpenAIKeyInput';

const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your application preferences and integrations.
          </p>
        </div>

        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">AI Integration</h2>
            <OpenAIKeyInput />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">St. Louis AI Assistant</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your intelligent companion for navigating St. Louis city services, 
                  local businesses, and community resources.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
