export const priceRanges = {
  '0-24.99': [0, 24.99],
  '25-99.99': [25, 99.99],
  '100-249.99': [100, 249.99],
  '250-749.99': [250, 749.99],
  '750-4999.99': [750, 4999.99],
  '5000-9999.99': [5000, 9999.99],
  '10000-24999.99': [10000, 24999.99],
  '25000-*': [25000],
};

export const priceBuckets = Object.keys(priceRanges)
  .reduce<string[]>((acc, curKey) => {
    const [from, to] = (priceRanges as any)[curKey];

    if (!to) {
      return [...acc, `price_${curKey}:price >= ${from}`];
    }

    return [...acc, `price_${curKey}:price >= ${from} AND price < ${to}`];
  }, [])
  .join(',');

export const filterAliases: Record<string, string> = {
  filtercats: 'category',
  category: 'filtercats',
};

export const singeFields = [
  'absdiscountFloat',
  'absolutediscount',
  'active',
  'adultsigreq',
  'autocompletewords',
  'brand',
  'brandcode',
  'catalogprice',
  'category1',
  'category2',
  'category3',
  'category4',
  'category5',
  'category6',
  'category7',
  'copy',
  'copysnippet',
  'daysonline',
  'description',
  'discount',
  'discountFloat',
  'displayprice',
  'freight',
  'freightcost_usa',
  'id',
  'image',
  'instock',
  'isgrizzly',
  'isnew',
  'iswholesale',
  'machinery',
  'margincode',
  'msrp',
  'onspecial',
  'outlet',
  'persona',
  'phaseout',
  'popularity',
  'price',
  'quantityavailable',
  'rankordering',
  'reviewcount',
  'reviewrating',
  'title',
  'upc',
  'url',
  'vendoritemnumber',
  'wholesaleprice',
  '_id',
];

export const filterFields = [
  {
    name: 'altcategory',
    label: 'altcategory',
  },
  {
    name: 'categoryid',
    label: 'categoryid',
  },
  {
    name: 'filtercats',
    label: 'Category',
  },
  {
    name: 'brand',
    label: 'Brand',
  },
  {
    name: 'abrasive_type',
    label: 'Abrasive Type',
  },

  {
    name: 'backing_type',
    label: 'Backing Type',
  },
  {
    name: 'bandsaw_size',
    label: 'Bandsaw Size',
  },
  {
    name: 'battery_type',
    label: 'Battery Type',
  },
  {
    name: 'bead',
    label: 'Bead',
  },
  {
    name: 'bevel_length',
    label: 'Bevel Length',
  },
  {
    name: 'bit_size',
    label: 'Bit Size',
  },
  {
    name: 'bit_type',
    label: 'Bit Type',
  },
  {
    name: 'blade_length_range',
    label: 'Blade Length Range',
  },
  {
    name: 'blade_material',
    label: 'Blade Material',
  },
  {
    name: 'blade_size',
    label: 'Blade Size',
  },
  {
    name: 'blade_width_range',
    label: 'Blade Width Range',
  },
  {
    name: 'blade_use',
    label: 'Blade Use',
  },
  {
    name: 'bore',
    label: 'Bore',
  },
  {
    name: 'bore_depth',
    label: 'Bore Depth',
  },
  {
    name: 'caliber',
    label: 'Caliber',
  },
  {
    name: 'capacity',
    label: 'Capacity',
  },
  {
    name: 'case_material',
    label: 'Case Material',
  },
  {
    name: 'caster_type',
    label: 'Caster Type',
  },
  {
    name: 'coating',
    label: 'Coating',
  },
  {
    name: 'color',
    label: 'Color',
  },
  {
    name: 'cfm',
    label: 'Cfm',
  },
  {
    name: 'chisel_type',
    label: 'Chisel Type',
  },
  {
    name: 'chuck_capacity',
    label: 'Chuck Capacity',
  },
  {
    name: 'chuck_diameter',
    label: 'Chuck Diameter',
  },
  {
    name: 'cleaning_kit_type',
    label: 'Cleaning Kit Type',
  },
  {
    name: 'cutterhead_type',
    label: 'Cutterhead Type',
  },
  {
    name: 'cutter_angle',
    label: 'Cutter Angle',
  },
  {
    name: 'cutting_depth',
    label: 'Cutting Depth',
  },
  {
    name: 'cutter_diameter',
    label: 'Cutter Diameter',
  },
  {
    name: 'cutter_radius',
    label: 'Cutter Radius',
  },
  {
    name: 'cutting_edge_angle',
    label: 'Cutting Edge Angle',
  },
  {
    name: 'cutting_height',
    label: 'Cutting Height',
  },
  {
    name: 'cutting_length',
    label: 'Cutting Length',
  },
  {
    name: 'cutting_width',
    label: 'Cutting Width',
  },
  {
    name: 'compatible_with',
    label: 'Compatible With',
  },
  {
    name: 'condition',
    label: 'Condition',
  },
  {
    name: 'configuration',
    label: 'Configuration',
  },
  {
    name: 'contour',
    label: 'Contour',
  },
  {
    name: 'diameter',
    label: 'Diameter',
  },
  {
    name: 'die_classification',
    label: 'Die Classification',
  },
  {
    name: 'direction',
    label: 'Direction',
  },
  {
    name: 'disc_diameter',
    label: 'Disc Diameter',
  },
  {
    name: 'distance_between_centers',
    label: 'Distance Between Centers',
  },
  {
    name: 'drill_chuck_size',
    label: 'Drill Chuck Size',
  },
  {
    name: 'disc_speed',
    label: 'Disc Speed',
  },
  {
    name: 'drill_press_type',
    label: 'Drill Press Type',
  },
  {
    name: 'dust_collector_type',
    label: 'Dust Collector Type',
  },
  {
    name: 'feed_speeds',
    label: 'Feed Speeds',
  },
  {
    name: 'fastener_type',
    label: 'Fastener Type',
  },
  {
    name: 'finished_length',
    label: 'Finished Length',
  },
  {
    name: 'grit',
    label: 'Grit',
  },
  {
    name: 'groove',
    label: 'Groove',
  },
  {
    name: 'gun_case_type',
    label: 'Gun Case Type',
  },
  {
    name: 'gun_make',
    label: 'Gun Make',
  },
  {
    name: 'gun_type',
    label: 'Gun Type',
  },
  {
    name: 'hand',
    label: 'Hand',
  },
  {
    name: 'horsepower',
    label: 'Horsepower',
  },
  {
    name: 'jointer_size',
    label: 'Jointer Size',
  },
  {
    name: 'length',
    label: 'Length',
  },
  {
    name: 'machine_series',
    label: 'Machine Series',
  },
  {
    name: 'magazine_type',
    label: 'Magazine Type',
  },
  {
    name: 'material',
    label: 'Material',
  },
  {
    name: 'max_cutter_diameter',
    label: 'Max Cutter Diameter',
  },
  {
    name: 'max_cutting_height',
    label: 'Max Cutting Height',
  },
  {
    name: 'max_distance_spindle_to_column',
    label: 'Max Distance Spindle To Column',
  },
  {
    name: 'max_distance_wheel_to_table',
    label: 'Max Distance Wheel To Table',
  },
  {
    name: 'max_gauge_full_width',
    label: 'Max Gauge Full Width',
  },
  {
    name: 'max_gauge_half_width',
    label: 'Max Gauge Half Width',
  },
  {
    name: 'max_height_of_rollers',
    label: 'Max Height Of Rollers',
  },
  {
    name: 'max_height_of_pan_sides',
    label: 'Max Height Of Pan Sides',
  },
  {
    name: 'max_rectangular_height_capacity',
    label: 'Max Rectangular Height Capacity',
  },
  {
    name: 'max_rectangular_width_capacity',
    label: 'Max Rectangular Width Capacity',
  },
  {
    name: 'max_rip_capacity',
    label: 'Max Rip Capacity',
  },
  {
    name: 'max_round_capacity',
    label: 'Max Round Capacity',
  },
  {
    name: 'max_rpm',
    label: 'Max Rpm',
  },
  {
    name: 'maximum_board_thickness',
    label: 'Maximum Board Thickness',
  },
  {
    name: 'maximum_board_width',
    label: 'Maximum Board Width',
  },
  {
    name: 'maximum_chisel_size',
    label: 'Maximum Chisel Size',
  },
  {
    name: 'maximum_mortising_depth',
    label: 'Maximum Mortising Depth',
  },
  {
    name: 'maximum_stock_width',
    label: 'Maximum Stock Width',
  },
  {
    name: 'minimum_bore',
    label: 'Minimum Bore',
  },
  {
    name: 'motor_type',
    label: 'Motor Type',
  },
  {
    name: 'nail_angle',
    label: 'Nail Angle',
  },
  {
    name: 'nail_size',
    label: 'Nail Size',
  },
  {
    name: 'nailer_type',
    label: 'Nailer Type',
  },
  {
    name: 'number_of_flutes',
    label: 'Number Of Flutes',
  },
  {
    name: 'number_of_speeds',
    label: 'Number Of Speeds',
  },
  {
    name: 'number_of_rollers',
    label: 'Number Of Rollers',
  },
  {
    name: 'overall_length',
    label: 'Overall Length',
  },
  {
    name: 'piece_count',
    label: 'Piece Count',
  },
  {
    name: 'planer_size',
    label: 'Planer Size',
  },
  {
    name: 'plug_type',
    label: 'Plug Type',
  },
  {
    name: 'power_source',
    label: 'Power Source',
  },
  {
    name: 'press_type',
    label: 'Press Type',
  },
  {
    name: 'receptacle_type',
    label: 'Receptacle Type',
  },
  {
    name: 'rest_type',
    label: 'Rest Type',
  },
  {
    name: 'roll_diameter',
    label: 'Roll Diameter',
  },
  {
    name: 'sanding_belt_length',
    label: 'Sanding Belt Length',
  },
  {
    name: 'sanding_belt_speed',
    label: 'Sanding Belt Speed',
  },
  {
    name: 'sanding_belt_width',
    label: 'Sanding Belt Width',
  },
  {
    name: 'sanding_drum_diameters',
    label: 'Sanding Drum Diameters',
  },
  {
    name: 'shank',
    label: 'Shank',
  },
  {
    name: 'size',
    label: 'Size',
  },
  {
    name: 'spindle_bore',
    label: 'Spindle Bore',
  },
  {
    name: 'spindle_sizes',
    label: 'Spindle Sizes',
  },
  {
    name: 'spindle_speeds',
    label: 'Spindle Speeds',
  },
  {
    name: 'spindle_stroke',
    label: 'Spindle Stroke',
  },
  {
    name: 'spindle_taper',
    label: 'Spindle Taper',
  },
  {
    name: 'spindle_thread_size',
    label: 'Spindle Thread Size',
  },
  {
    name: 'spindle_travel',
    label: 'Spindle Travel',
  },
  {
    name: 'steel_type',
    label: 'Steel Type',
  },
  {
    name: 'stock_model',
    label: 'Stock Model',
  },
  {
    name: 'stock_type',
    label: 'Stock Type',
  },
  {
    name: 'style',
    label: 'Style',
  },
  {
    name: 'swing',
    label: 'Swing',
  },
  {
    name: 'swing_over_bed',
    label: 'Swing Over Bed',
  },
  {
    name: 'table_saw_type',
    label: 'Table Saw Type',
  },
  {
    name: 'table_length',
    label: 'Table Length',
  },
  {
    name: 'table_tilt',
    label: 'Table Tilt',
  },
  {
    name: 'table_width',
    label: 'Table Width',
  },
  {
    name: 'taper',
    label: 'Taper',
  },
  {
    name: 'thickness',
    label: 'Thickness',
  },
  {
    name: 'throat',
    label: 'Throat',
  },
  {
    name: 'tool_holder_series',
    label: 'Tool Holder Series',
  },
  {
    name: 'tool_post_holder_series',
    label: 'Tool Post Holder Series',
  },
  {
    name: 'tool_type',
    label: 'Tool Type',
  },
  {
    name: 'tooth_set',
    label: 'Tooth Set',
  },
  {
    name: 'tpi',
    label: 'Tpi',
  },
  {
    name: 'twist',
    label: 'Twist',
  },
  {
    name: 'usage',
    label: 'Usage',
  },
  {
    name: 'voltage',
    label: 'Voltage',
  },
  {
    name: 'wheel_size',
    label: 'Wheel Size',
  },
  {
    name: 'width',
    label: 'Width',
  },
];

export const count = filterFields.map(({ name }) => name).join(',');
