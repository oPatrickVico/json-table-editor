import { createSlice } from '@reduxjs/toolkit';
import { counterGenerator } from '../../utils/helperFunctions';

const initialState = {
  instances: [
    { 'property 0': '', 'property 1': '' },
    { 'property 0': '', 'property 1': '' },
  ],
  schema: [{ name: 'property 0' }, { name: 'property 1' }],
  clipboard: { type: null, data: null },
  // The clipboard may contain: instances, properties
  // They are identified by the "type" filed
  propCounter: counterGenerator(2),
  title: 'New Table',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // Cell Manager
    updateDataCell: (state, action) => {
      const { instanceIndex, propertyIndex, data } = action.payload;
      state.instances[instanceIndex][propertyIndex] = data;
    },
    updateHeadingCell: (state, action) => {
      const { propertyIndex, data } = action.payload;
      state.schema[propertyIndex] = data;
    },

    // Instance Manager
    addInstance: (state) => {
      let newInstance = state.schema.map((property) => [property.name, '']);
      newInstance = Object.fromEntries(newInstance);
      state.instances.push(newInstance);
    },
    deleteInstance: (state, action) => {
      const { instanceIndex } = action.payload;
      state.instances.splice(instanceIndex, 1);
    },
    copyInstance: (state, action) => {
      const { instanceIndex } = action.payload;
      state.clipboard = {
        type: 'instance',
        data: state.instances[instanceIndex],
      };
    },
    cutInstance: (state, action) => {
      const { instanceIndex } = action.payload;
      // splice removes element from array and returns it as array
      let cutInstance = state.instances.splice(instanceIndex, 1)[0];
      state.clipboard = { type: 'instance', data: cutInstance };
    },
    pasteInstance: (state, action) => {
      if (state.clipboard.type !== 'instance') return;
      const { instanceIndex } = action.payload;
      state.instances.splice(instanceIndex, 0, state.clipboard);
    },
    duplicateInstance: (state, action) => {
      const { instanceIndex } = action.payload;
      state.instances.splice(
        instanceIndex + 1,
        0,
        state.instances[instanceIndex]
      );
    },

    // Property Manager
    addProperty: (state, action) => {
      const { propertyIndex } = action.payload;
      const propNum = state.propCounter.next().value;
      const propertyName = `property ${propNum}`;
      state.instances.map((instance) => (instance[propertyName] = ''));
      state.schema.splice(propertyIndex, 0, propertyName);
    },
    deleteProperty: (state, action) => {
      const { propertyIndex } = action.payload;
      state.instances.splice(propertyIndex, 1);
    },
    copyProperty: (state, action) => {
      const { propertyIndex } = action.payload;
      const propertyName = state.schema[propertyIndex].name;
      const propertySlice = state.instances.map(
        (instance) => instance[propertyName]
      );
      state.clipboard = {
        type: 'property',
        data: propertySlice,
      };
    },
    cutProperty: (state, action) => {
      const { propertyIndex } = action.payload;
      const property = state.schema[propertyIndex];
      const propertySlice = state.instances.map((instance) => {
        // propertySlice is a copy of all instances' values
        // under same property name
        let value = instance[property.name];
        delete instance[property.name];
        return value;
      });
      state.schema.splice(propertyIndex, 1);
      state.clipboard = {
        type: 'property',
        data: {
          property,
          propertySlice,
        },
      };
    },
    pasteProperty: (state, action) => {
      if (state.clipboard.type !== 'property') return;
      const { propertyIndex } = action.payload;
      const { property, name, propertySlice } = state.clipboard.data;
      this.instances.forEach((instance, instanceIndex) => {
        instance[(property, name)] = propertySlice[instanceIndex];
      });
      this.schema.splice(propertyIndex, 0, property);
    },

    // Table Manager
    updateTitle: (state, action) => {},
    importTable: (state, action) => {},
    exportTable: (state, action) => {},
    newTable: (state, action) => {},
  },
});

export const {
  //Cell Manager
  updateDataCell,
  updateHeadingCell,

  // Instance Manager
  addInstance,
  deleteInstance,
  copyInstance,
  cutInstance,
  pasteInstance,
  duplicateInstance,

  // Property Manager
  addProperty,
  deleteProperty,
  copyProperty,
  cutProperty,
  pasteProperty,

  // Table Manager
  updateTitle,
  importTable,
  exportTable,
  newTable,
} = tableSlice.actions;

const tableReducer = tableSlice.reducer;

export default tableReducer;