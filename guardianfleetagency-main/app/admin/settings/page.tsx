import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Mail, Bell, Shield, Globe, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Settings</h1>
        <p className="text-gray-600">
          Configure system settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-navy">
              <Globe className="h-5 w-5" />
              <span>Company Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="guardianfleetagency" />
            </div>
            <div>
              <Label htmlFor="company-address">Address</Label>
              <Textarea
                id="company-address"
                defaultValue="1234 Military Base Rd, Fort Knox, KY 40121"
              />
            </div>
            <div>
              <Label htmlFor="company-phone">Phone</Label>
              <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="company-email">Email</Label>
              <Input
                id="company-email"
                type="email"
                defaultValue="contact@guardianfleetagency.com"
              />
            </div>
            <Button className="bg-army-green hover:bg-army-green-light text-white">
              Save Company Info
            </Button>
          </CardContent>
        </Card>

        {/* Email Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-navy">
              <Mail className="h-5 w-5" />
              <span>Email Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" placeholder="smtp.example.com" />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" placeholder="587" />
            </div>
            <div>
              <Label htmlFor="smtp-username">Username</Label>
              <Input id="smtp-username" placeholder="your-email@example.com" />
            </div>
            <div>
              <Label htmlFor="smtp-password">Password</Label>
              <Input
                id="smtp-password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <Button className="bg-army-green hover:bg-army-green-light text-white">
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-navy">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">
                  Send email updates for shipment status changes
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">
                  Send SMS updates to customers
                </p>
              </div>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="admin-alerts">Admin Alerts</Label>
                <p className="text-sm text-gray-600">
                  Notify admins of system events
                </p>
              </div>
              <Switch id="admin-alerts" defaultChecked />
            </div>
            <Button className="bg-army-green hover:bg-army-green-light text-white">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-navy">
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="session-timeout">Auto Logout</Label>
                <p className="text-sm text-gray-600">
                  Automatically log out inactive users
                </p>
              </div>
              <Switch id="session-timeout" defaultChecked />
            </div>
            <div>
              <Label htmlFor="session-duration">
                Session Duration (minutes)
              </Label>
              <Input id="session-duration" type="number" defaultValue="60" />
            </div>
            <Button className="bg-army-green hover:bg-army-green-light text-white">
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-navy">
              <Database className="h-5 w-5" />
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tracking-prefix">
                    Tracking Number Prefix
                  </Label>
                  <Input id="tracking-prefix" defaultValue="GFA" />
                </div>
                <div>
                  <Label htmlFor="default-status">
                    Default Shipment Status
                  </Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="ready_for_pickup">Ready for Pickup</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-tracking">
                      Auto-Generate Tracking
                    </Label>
                    <p className="text-sm text-gray-600">
                      Automatically create tracking events
                    </p>
                  </div>
                  <Switch id="auto-tracking" defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="log-retention">Log Retention (days)</Label>
                  <Input id="log-retention" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">
                      Temporarily disable public access
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <Button className="bg-army-green hover:bg-army-green-light text-white mr-4">
                Save All Settings
              </Button>
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white bg-transparent"
              >
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
