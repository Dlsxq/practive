import 'dart:async';
import 'dart:mirrors';

abstract class ReflectMetadata {
  /// 获取元数据
  List<T> getMetadata<T>();
  Symbol getSymolName();
}

abstract class ReflectMethod implements ReflectMetadata {
  /// 获取函数的参数列表
  List<ParameterMirror> getParams<T>();
  
  /// 获取函数的返回值类型
  T getReturnType<T>();
}

abstract class ReflectClassAbs<Inst> implements ReflectMethod {
  late Type superClass;
  late ClassMirror superMirror;

  /// 获取一个类的实例
  Inst getInstance(List<dynamic> args);

  /// 获取构造函数
  Inst getCtor();

  /// 所有的静态方法
  List<MethodMirror> getStaticMethods();

  /// 所有的静态属性
  List<VariableMirror> getStaticProps();

  /// 所有的实例属性
  List<MethodMirror> getInstanceMethods();

  /// 所有的实例属性
  List<VariableMirror> getInstanceProps();
}

class ReflectClass<T> implements ReflectClassAbs<T> {
  @override
  Type superClass;

  @override
  ClassMirror superMirror;

  @override
  T getCtor() {
    // TODO: implement getCtor
    throw UnimplementedError();
  }

  @override
  T getInstance(List args) {
    // TODO: implement getInstance
    throw UnimplementedError();
  }

  @override
  List<MethodMirror> getInstanceMethods() {
    // TODO: implement getInstanceMethods
    throw UnimplementedError();
  }

  @override
  List<VariableMirror> getInstanceProps() {
    // TODO: implement getInstanceProps
    throw UnimplementedError();
  }

  @override
  List<T> getMetadata<T>() {
    // TODO: implement getMetadata
    throw UnimplementedError();
  }

  @override
  List<ParameterMirror> getParams<T>() {
    // TODO: implement getParams
    throw UnimplementedError();
  }

  @override
  T getReturnType<T>() {
    // TODO: implement getReturnType
    throw UnimplementedError();
  }

  @override
  List<MethodMirror> getStaticMethods() {
    // TODO: implement getStaticMethods
    throw UnimplementedError();
  }

  @override
  List<VariableMirror> getStaticProps() {
    // TODO: implement getStaticProps
    throw UnimplementedError();
  }

  @override
  Symbol getSymolName() {
    // TODO: implement getSymolName
    throw UnimplementedError();
  }
  // late Type superClass;
  // late ClassMirror superMirror;

  ReflectClass(this.superClass) : superMirror = reflectClass(superClass);

  // List<T> getMetadata<T>() {
  //   return this.superMirror.metadata.map((e) => e.reflectee) as List<T>;
  // }

  // getCtor() {}
}
