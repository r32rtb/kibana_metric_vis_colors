import 'plugins/metric_vis_colors/metric_vis_colors.less';
import 'plugins/metric_vis_colors/metric_vis_colors_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import metricVisColorsVisTemplate from 'plugins/metric_vis_colors/metric_vis_colors.html';
import metricVisColorsVisParamsTemplate from 'plugins/metric_vis_colors/metric_vis_colors_params.html';
// we need to load the css ourselves

// we also need to load the controller and used by the template

// register the provider with the visTypes registry
require('ui/registry/vis_types').register(MetricVisProvider);

function MetricVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'metric-vis-colors',
    title: 'Metric with Colors',
    description: 'One big number for all of your one big number needs. Perfect for showing ' +
	  'a count of hits, or the exact average a numeric field. Now with customizable colors.',
    icon: 'fa-calculator',
    template: metricVisColorsVisTemplate,
    params: {
      defaults: {
		handleNoResults: true,
        fontSize: 60,
        bgColor: 'white',
        fontColor: 'black'
      },
      editor: metricVisColorsVisParamsTemplate
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      }
    ])
  });
}

// export the provider so that the visType can be required with Private()
export default MetricVisProvider;
