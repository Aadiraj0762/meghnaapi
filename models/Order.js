// const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);
// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     invoice: {
//       type: Number,
//       required: true,
//     },
//     cart: [{}],
//     user_info: {
//       name: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//       },
//       contact: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       country: {
//         type: String,
//         required: true,
//       },
//       zipCode: {
//         type: String,
//         required: true,
//       },
//     },
//     subTotal: {
//       type: Number,
//       required: true,
//     },
//     shippingCost: {
//       type: Number,
//       required: true,
//     },
//     discount: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     total: {
//       type: Number,
//       required: true,
//     },
//     shippingOption: {
//       type: String,
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     cardInfo: {
//       type: Object,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Processing", "Delivered", "Cancel"],
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const Order = mongoose.model(
//   "Order",
//   orderSchema.plugin(AutoIncrement, {
//     inc_field: "invoice",
//     start_seq: 10000,
//   })
// );
// module.exports = Order;



const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoice: {
      type: Number,
      required: false,
    },
    cart: [{}],
    user_info: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      zipCode: {
        type: String,
        required: false,
      },
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingOption: {
      type: String,
      enum: ["Pickup", "Deliver"],
      required: true,
    },
    
    paymentMethod: {
      type: String,
      required: true,
    },
    cardInfo: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Cancel"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model(
  "Order",
  orderSchema.plugin(AutoIncrement, {
    inc_field: "invoice",
    start_seq: 10000,
  })
);

module.exports = Order;
