import { pythonBasicsLessons } from './basics';
import { comprehensionsLesson } from './comprehensions';
import { pythonOopLessons } from './oop';
import {
  tuplesLesson,
  fileIOLesson,
  modulesLesson,
  typeHintsLesson,
  recursionLesson,
  stdlibTourLesson,
} from './stdlib';

// 📐 Linear Algebra
import { laScalarsVectorsLesson }       from '../linear-algebra/scalars-vectors';
import { laVectorOpsLesson }            from '../linear-algebra/vector-ops';
import { laNormsDistanceLesson }        from '../linear-algebra/norms-distance';
import { laMatricesIntroLesson }        from '../linear-algebra/matrices-intro';
import { laMatrixMultiplicationLesson } from '../linear-algebra/matrix-multiplication';
import { laInverseDeterminantLesson }   from '../linear-algebra/inverse-determinant';
import { laLinearSystemsLesson }        from '../linear-algebra/linear-systems';
import { laDotProductLesson }           from '../linear-algebra/dot-product-deep';
import { laEigenLesson }                from '../linear-algebra/eigen';
import { laCapstoneLesson }             from '../linear-algebra/capstone';

// 📈 Calculus
import { calcFunctionsLesson }           from '../calculus/functions';
import { calcRateOfChangeLesson }        from '../calculus/rate-of-change';
import { calcLimitsLesson }              from '../calculus/limits';
import { calcDerivativesIntroLesson }    from '../calculus/derivatives-intro';
import { calcDerivativeRulesLesson }     from '../calculus/derivative-rules';
import { calcCommonDerivativesLesson }   from '../calculus/common-derivatives';
import { calcSecondDerivativeLesson }    from '../calculus/second-derivative';
import { calcChainRuleDeepLesson }       from '../calculus/chain-rule-deep';
import { calcPartialDerivativesLesson }  from '../calculus/partial-derivatives';
import { calcGradientLesson }            from '../calculus/gradient';
import { calcGradientDescentLesson }     from '../calculus/gradient-descent';
import { calcOptimizationLesson }        from '../calculus/optimization';

// 📊 NumPy
import { numpyArraysLesson } from '../numpy/arrays';
import { numpyIndexingLesson } from '../numpy/indexing';
import { numpyReshapingLesson } from '../numpy/reshaping';
import { numpyVectorizationLesson } from '../numpy/vectorization';
import { numpyAggregationLesson } from '../numpy/aggregation';
import { numpyBroadcastingLesson } from '../numpy/broadcasting';
import { numpyRandomStatsLesson } from '../numpy/random-stats';
import { numpyLinAlgLesson } from '../numpy/linalg';
import { ufuncsLesson } from '../numpy/ufuncs';
import { tensorsLesson } from '../numpy/tensors';
import { applicationsLesson } from '../numpy/applications';

// 🐼 Pandas
import { pandasSeriesLesson }    from '../pandas/series';
import { pandasDataframeLesson } from '../pandas/dataframe';
import { pandasIndexingLesson }  from '../pandas/indexing';
import { pandasMissingLesson }   from '../pandas/missing';
import { pandasTransformLesson } from '../pandas/transform';
import { pandasSortRankLesson }  from '../pandas/sort-rank';
import { pandasGroupbyLesson }   from '../pandas/groupby';
import { pandasMergeLesson }     from '../pandas/merge';
import { pandasReshapeLesson }   from '../pandas/reshape';
import { pandasCapstoneLesson }  from '../pandas/capstone';

// 🤖 Machine Learning
import { mlWhatIsMlLesson }          from '../ml/what-is-ml';
import { mlLinearRegressionLesson }  from '../ml/linear-regression';
import { mlLossFunctionsLesson }     from '../ml/loss-functions';
import { mlOverfittingLesson }       from '../ml/overfitting';
import { mlClassificationLesson }    from '../ml/classification';
import { mlMetricsLesson }           from '../ml/metrics';
import { mlDecisionTreesLesson }     from '../ml/decision-trees';
import { mlRandomForestsLesson }     from '../ml/random-forests';
import { mlKnnLesson }               from '../ml/knn';
import { mlKmeansLesson }            from '../ml/kmeans';
import { mlFeatureEngineeringLesson } from '../ml/feature-engineering';
import { mlCapstoneLesson }          from '../ml/capstone';

const basicsWithExtras = {
  ...pythonBasicsLessons,
  comprehensions: comprehensionsLesson,
  tuples: tuplesLesson,
  'file-io': fileIOLesson,
  'modules-imports': modulesLesson,
  'type-hints': typeHintsLesson,
  recursion: recursionLesson,
  'stdlib-tour': stdlibTourLesson,
};

const linearAlgebraLessons = {
  'la-scalars-vectors':       laScalarsVectorsLesson,
  'la-vector-ops':            laVectorOpsLesson,
  'la-norms-distance':        laNormsDistanceLesson,
  'la-matrices-intro':        laMatricesIntroLesson,
  'la-matrix-multiplication': laMatrixMultiplicationLesson,
  'la-inverse-determinant':   laInverseDeterminantLesson,
  'la-linear-systems':        laLinearSystemsLesson,
  'la-dot-product-deep':      laDotProductLesson,
  'la-eigen':                 laEigenLesson,
  'la-capstone':              laCapstoneLesson,
};

const calculusLessons = {
  'calc-functions':           calcFunctionsLesson,
  'calc-rate-of-change':      calcRateOfChangeLesson,
  'calc-limits':              calcLimitsLesson,
  'calc-derivatives-intro':   calcDerivativesIntroLesson,
  'calc-derivative-rules':    calcDerivativeRulesLesson,
  'calc-common-derivatives':  calcCommonDerivativesLesson,
  'calc-second-derivative':   calcSecondDerivativeLesson,
  'calc-chain-rule-deep':     calcChainRuleDeepLesson,
  'calc-partial-derivatives': calcPartialDerivativesLesson,
  'calc-gradient':            calcGradientLesson,
  'calc-gradient-descent':    calcGradientDescentLesson,
  'calc-optimization':        calcOptimizationLesson,
};

const mlLessons = {
  'ml-what-is-ml':          mlWhatIsMlLesson,
  'ml-linear-regression':   mlLinearRegressionLesson,
  'ml-loss-functions':      mlLossFunctionsLesson,
  'ml-overfitting':         mlOverfittingLesson,
  'ml-classification':      mlClassificationLesson,
  'ml-metrics':             mlMetricsLesson,
  'ml-decision-trees':      mlDecisionTreesLesson,
  'ml-random-forests':      mlRandomForestsLesson,
  'ml-knn':                 mlKnnLesson,
  'ml-kmeans':              mlKmeansLesson,
  'ml-feature-engineering': mlFeatureEngineeringLesson,
  'ml-capstone':            mlCapstoneLesson,
};

const numpyLessons = {
  'numpy-arrays': numpyArraysLesson,
  'numpy-indexing': numpyIndexingLesson,
  'numpy-reshaping': numpyReshapingLesson,
  'numpy-vectorization': numpyVectorizationLesson,
  'numpy-aggregation': numpyAggregationLesson,
  'numpy-broadcasting': numpyBroadcastingLesson,
  'numpy-random-stats': numpyRandomStatsLesson,
  'numpy-linalg': numpyLinAlgLesson,
  'numpy-ufuncs': ufuncsLesson,
  'numpy-tensors': tensorsLesson,
  'numpy-applications': applicationsLesson,
};

const pandasLessons = {
  'pandas-series':    pandasSeriesLesson,
  'pandas-dataframe': pandasDataframeLesson,
  'pandas-indexing':  pandasIndexingLesson,
  'pandas-missing':   pandasMissingLesson,
  'pandas-transform': pandasTransformLesson,
  'pandas-sort-rank': pandasSortRankLesson,
  'pandas-groupby':   pandasGroupbyLesson,
  'pandas-merge':     pandasMergeLesson,
  'pandas-reshape':   pandasReshapeLesson,
  'pandas-capstone':  pandasCapstoneLesson,
};

const byModule = {
  'python-basics': basicsWithExtras,
  'python-oop': pythonOopLessons,
  'linear-algebra': linearAlgebraLessons,
  calculus: calculusLessons,
  numpy: numpyLessons,
  pandas: pandasLessons,
  ml: mlLessons,                    
};

export function getLesson(moduleId, lessonId) {
  const source = byModule[moduleId];
  if (!source) return null;
  return source[lessonId] || null;
}

export function getAllLessons() {
  const out = [];
  for (const [moduleId, lessons] of Object.entries(byModule)) {
    for (const [lessonId, lesson] of Object.entries(lessons)) {
      out.push({ moduleId, lessonId, lesson });
    }
  }
  return out;
}