'use client';

import { Form } from '@repo/ui/components/base/form';
import { useForm, zodResolver } from '@repo/ui/lib/form';
import { OrderEditFormValues, orderEditSchema } from './edit-order-schema';
import {
  AlertCircle,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  Save,
  User,
  X,
} from '@repo/ui/lib/icons';
import TextField from './atom/text-field';
import SelectField from './atom/select-field';
import { Button } from '@repo/ui/components/base/button';
import { memo } from 'react';

function EditOrderForm() {
  const form = useForm({
    resolver: zodResolver(orderEditSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      status: '',
      totalAmount: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      notes: '',
      items: [],
    },
    mode: 'onChange',
  });

  function onSubmit(values: OrderEditFormValues) {
    console.log(values);
  }

  const orderStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const items = [
    { id: '1', productName: 'Product 1', price: 10, quantity: 1, stock: 10 },
    { id: '2', productName: 'Product 2', price: 20, quantity: 2, stock: 20 },
  ];

  const totalAmount = 30;

  const handleQuantityChange = (index: number, quantity: number) => {
    console.log(index, quantity);
  };

  const order = {
    status: 'pending',
    cancelledBy: 'No reason provided',
  };

  const OrderStatus = {
    PENDING: 'pending',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Customer Information */}
          <div className="bg-background border-border border p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Customer Information</h2>
            <div className="space-y-4">
              <TextField
                control={form.control}
                name="customerName"
                label="Customer Name"
                placeholder="Enter customer name"
                icon={<User size={18} />}
              />

              <TextField
                control={form.control}
                name="customerEmail"
                label="Email Address"
                placeholder="Enter email address"
                icon={<Mail size={18} />}
              />

              <TextField
                control={form.control}
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter phone number"
                icon={<Phone size={18} />}
              />
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-background border-border border p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Order Details</h2>
            <div className="space-y-4">
              <SelectField
                control={form.control}
                name="status"
                label="Order Status"
                options={orderStatusOptions}
              />

              <TextField
                control={form.control}
                name="totalAmount"
                label="Total Amount"
                placeholder="Enter total amount"
                icon={<CreditCard size={18} />}
                type="number"
                disabled={true}
              />

              <div className="pt-2">
                <p className="text-muted-foreground mb-1 text-sm">Order Date</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-background border-border border p-6 shadow-sm md:col-span-2">
            <h2 className="mb-4 text-lg font-medium">Order Items</h2>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Price</th>
                      <th className="px-4 py-3 text-center font-medium">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted flex h-10 w-10 items-center justify-center">
                              <Package className="text-muted-foreground h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-muted-foreground text-xs">
                                Stock: {item.stock}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center">
                            <button
                              type="button"
                              className="border-input bg-background flex h-8 w-8 items-center justify-center border"
                              onClick={() =>
                                handleQuantityChange(index, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <input
                              type="number"
                              className="border-input h-8 w-12 border-y text-center"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  index,
                                  parseInt(e.target.value) || 1,
                                )
                              }
                              min={1}
                              max={item.stock}
                            />
                            <button
                              type="button"
                              className="border-input bg-background flex h-8 w-8 items-center justify-center border"
                              onClick={() =>
                                handleQuantityChange(index, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-3 text-right font-medium"
                      >
                        Total Amount:
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-background border-border border p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Shipping Address</h2>
            <div className="space-y-4">
              <TextField
                control={form.control}
                name="addressLine1"
                label="Address Line 1"
                placeholder="Enter address line 1"
                icon={<MapPin size={18} />}
              />

              <TextField
                control={form.control}
                name="addressLine2"
                label="Address Line 2"
                placeholder="Enter address line 2 (optional)"
                icon={<MapPin size={18} />}
              />

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter city"
                />

                <TextField
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="Enter state"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  control={form.control}
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Enter postal code"
                />

                <TextField
                  control={form.control}
                  name="country"
                  label="Country"
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-background border-border border p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Order Notes</h2>
            <div>
              <TextField
                control={form.control}
                name="notes"
                label="Notes"
                placeholder="Enter any notes about this order"
              />

              {order.status === OrderStatus.CANCELLED && (
                <div className="mt-4 flex items-start gap-2 bg-red-50 p-3 text-red-800">
                  <AlertCircle className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Cancellation Reason</p>
                    <p className="text-sm">{'No reason provided'}</p>
                    {order.cancelledBy && (
                      <p className="mt-1 text-xs">
                        Cancelled by: {order.cancelledBy}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => {}}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button type="submit" disabled={!form.formState.isDirty}>
            {form.formState.isSubmitting ? (
              <>
                <svg
                  className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(EditOrderForm);
